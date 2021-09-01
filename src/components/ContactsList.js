import React from 'react';
import { Button, ListGroup, Row, Col } from 'react-bootstrap';

function ContactDetails({ item }) {
  return (
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <span className='fw-bolder text-uppercase lh-lg'>{item.name}</span>
      </ListGroup.Item>
      <ListGroup.Item>
        <span className='fst-italic'>Email:</span> {item.email}
      </ListGroup.Item>
      <ListGroup.Item>
        <span className='fst-italic'>Phone:</span> {item.phone}
      </ListGroup.Item>
    </ListGroup>
  );
}

function ContactsList({ deleteContact, editContact, contacts }) {
  return (
    <ListGroup>
      {contacts.map((item) => (
        <ListGroup.Item key={item.id}>
          <Row>
            <Col>
              <ContactDetails item={item} />
            </Col>
            <Col lg={'auto'}>
              <Button
                onClick={() => editContact(item)}
                variant='outline-primary'
                className={'me-2'}
              >
                Edit
              </Button>
              <Button
                onClick={() => deleteContact(item)}
                variant='outline-danger'
                className={'me-2'}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ContactsList;
