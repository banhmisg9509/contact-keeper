const contacts = (router) => {

  // @route   GET api/contacts
  // @desc    Get all users contacts
  // @access  Private
  router.get('/contacts', (req, res) => {
    res.send('Get all contacts');
  });

  // @route   POST api/contacts
  // @desc    Add new contacts
  // @access  Private
  router.post('/contacts', (req, res) => {
    res.send('Add contact');
  });

  // @route   PUT api/contacts/:id
  // @desc    Update contact
  // @access  Private
  router.put('/contacts/:id', (req, res) => {
    res.send('Update contact ' + req.params.id);
  });

  // @route   DELETE api/contacts/:id
  // @desc    Delete contact
  // @access  Private
  router.delete('/contacts/:id', (req, res) => {
    res.send('Delete contact ' + req.params.id);
  });
};

export default contacts;
