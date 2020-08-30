import React, { useContext, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
      <TransitionGroup>
        {listContacts.map((contact) => (
          <CSSTransition key={contact.id} timeout={500} classNames='item'>
            <ContactItem contact={contact} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
}

export default Contacts;
