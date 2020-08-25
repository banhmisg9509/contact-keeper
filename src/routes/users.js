import { check, validationResult } from 'express-validator';
import { User } from '../models';
import { signJWTToken } from '../services/authService';

const validateUser = [
  check('name', 'Name is required.').not().isEmpty(),
  check('email', 'Please include a valid email.').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
];

const users = (router) => {
  // @route   POST api/users
  // @desc    Register a user
  // @access  Public
  router.post('/users', validateUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({ name, email, pwd: password });

      await user.save();

      signJWTToken(user)
        .then((token) => res.json({ token }))
        .catch((err) => handleErrorResponse(res, err));
    } catch (err) {
      handleErrorResponse(res, err);
    }
  });
};

export default users;
