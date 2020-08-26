import { check, validationResult } from 'express-validator';
import { registerUser } from '../services/userService';

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

    registerUser(req, res);
  });
};

export default users;
