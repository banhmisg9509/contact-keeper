import { ContactContext } from 'context';
import React, { useContext, useRef, useEffect } from 'react';

function ContactFilter() {
  const { filterContacts, clearFilter, filtered } = useContext(ContactContext);
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChange}
      />
    </form>
  );
}

export default ContactFilter;
