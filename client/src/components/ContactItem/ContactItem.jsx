import { ContactContext } from 'context';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

function ContactItem({ contact }) {
  const { deleteContact, setCurrent, clearCurrent } = useContext(ContactContext);
  const { id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  }

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        <span>{name}</span>
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'> {email} </i>
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'> {phone} </i>
          </li>
        )}
      </ul>
      <div>
        <button className='btn btn-dark btn-sm' onClick={() => setCurrent(contact)}>Edit</button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
