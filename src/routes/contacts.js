import { check, validationResult } from 'express-validator';
import { Contact } from '../models';
import { handleErrorResponse } from '../services/commonService';
import verifyToken from '../middleware/auth';

const contacts = (router) => {
  // @route   GET api/contacts
  // @desc    Get all users contacts
  // @access  Private
  router.get('/contacts', verifyToken, async (req, res) => {
    try {
      const contacts = await Contact.find({ user: req.user.id }).sort({
        date: -1,
      });
      res.json(contacts);
    } catch (err) {
      handleErrorResponse(res, err);
    }
  });

  // @route   POST api/contacts
  // @desc    Add new contacts
  // @access  Private
  router.post(
    '/contacts',
    [verifyToken, [check('name', 'Name is required.').not().isEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, phone, type } = req.body;
      try {
        const newContact = new Contact({
          name,
          email,
          phone,
          type,
          user: req.user.id,
        });

        const contact = await newContact.save();
        return res.json(contact);
      } catch (err) {
        handleErrorResponse(res, err);
      }
    }
  );

  // @route   PUT api/contacts/:id
  // @desc    Update contact
  // @access  Private
  router.put('/contacts/:id', verifyToken, async (req, res) => {
    const { name, email, phone, type } = req.body;

    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
      let contact = await Contact.findById(req.params.id);
      if (!contact) return res.status(404).json({ msg: 'Contact not found' });

      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      contact = await Contact.findByIdAndUpdate(
        req.params.id,
        {$set: contactFields},
        {new: true},
      );

      res.json(contact);
    } catch (err) {
      handleErrorResponse(res, err);
    }
  });

  // @route   DELETE api/contacts/:id
  // @desc    Delete contact
  // @access  Private
  router.delete('/contacts/:id', verifyToken, async (req, res) => {
    try {
      let contact = await Contact.findById(req.params.id);
      if (!contact) return res.status(404).json({ msg: 'Contact not found' });

      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      await Contact.findOneAndDelete({ _id: req.params.id });
      res.json({ msg: 'Successfully deleted contact' });
    } catch (err) {
      handleErrorResponse(res, err);
    }
  });
};

export default contacts;
