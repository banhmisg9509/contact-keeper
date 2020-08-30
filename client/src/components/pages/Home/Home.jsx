import React from 'react';
import { Contacts, ContactForm, ContactFilter } from 'components';

function Home() {
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
}

export default Home;
