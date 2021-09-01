import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

function ContactsFilter({ filter, setFilter }) {
  return (
    <InputGroup className='mb-3'>
      <InputGroup.Text id='inputGroup-sizing-default'>Search by name:</InputGroup.Text>
      <FormControl
        aria-label='Default'
        aria-describedby='inputGroup-sizing-default'
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </InputGroup>
  );
}

export default ContactsFilter;
