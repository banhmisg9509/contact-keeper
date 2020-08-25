import { check, validationResult } from 'express-validator';
import { User } from '../models';
import { signJWTToken } from '../services/authService';
import { handleErrorResponse } from '../services/commonService';

const validateLogin = [
  check('email', 'Please include a valid email.').isEmail(),
  check('password', 'Password is required.').exists(),
];

const auth = (router) => {
  // @route   GET api/auth
  // @desc    Get logged in user
  // @access  Private
  router.get('/auth', (req, res) => {
    res.send('Get logged in user');
  });

  // @route   POST api/auth
  // @desc    Auth user & get token
  // @access  Public
  router.post('/auth', validateLogin, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials!' });
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials!' });
      }

      signJWTToken(user)
        .then((token) => res.json({ token }))
        .catch((err) => handleErrorResponse(res, err));
    } catch (err) {
      handleErrorResponse(res, err);
    }
  });
};

export default auth;
