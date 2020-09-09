import React, { useContext, Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ContactContext } from 'context';
import { ContactItem, Spinner } from 'components';

function Contacts() {
  const { contacts, filtered, getContacts, loading } = useContext( ContactContext );

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts && !loading && contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  const listContacts = filtered ? filtered : contacts;

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {listContacts.map((contact) => (
            <CSSTransition key={contact._id} timeout={500} classNames='item'>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
}

export default Contacts;
