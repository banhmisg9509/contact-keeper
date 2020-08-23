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
  router.post('/auth', (req, res) => {
    res.send('Log in user');
  });
};

export default auth;
