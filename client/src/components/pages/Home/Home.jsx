import React, { useEffect, useContext } from 'react';
import { Contacts, ContactForm, ContactFilter } from 'components';
import { AuthContext } from 'context';
function Home() {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

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
