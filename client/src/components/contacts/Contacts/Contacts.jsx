import React, { useContext, Fragment } from 'react';
import { ContactContext } from 'context';
import { ContactItem } from 'components';

function Contacts() {
  const { contacts, filtered } = useContext(ContactContext);

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  const listContacts = filtered ? filtered : contacts;

  return (
    <Fragment>
      {listContacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
}

export default Contacts;
