import { check, validationResult } from 'express-validator';
import { login } from '../services/authService';

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
    login(req, res);
  });
};

export default auth;
