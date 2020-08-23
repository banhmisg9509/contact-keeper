const users = (router) => {

  // @route   POST api/users
  // @desc    Register a user
  // @access  Public
  router.post('/users', (req, res) => {
    res.send('Register a user');
  });
};

export default users;
