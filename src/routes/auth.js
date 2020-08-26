import { check, validationResult } from 'express-validator';
import verifyToken from '../middleware/auth';
import { getLoggedInUser, login } from '../services/authService';

const validateLogin = [
  check('email', 'Please include a valid email.').isEmail(),
  check('password', 'Password is required.').exists(),
];

const auth = (router) => {
  // @route   GET api/auth
  // @desc    Get logged in user
  // @access  Private
  router.get('/auth', verifyToken, async (req, res) => {
    getLoggedInUser(req, res);
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
