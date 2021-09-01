import React from 'react';
import { Container, Row, Col, Modal, Button, Spinner, Alert } from 'react-bootstrap';
import { contactsService } from '../api/apiService';
import ContactForm from '../components/ContactForm';
import ContactsList from '../components/ContactsList';
import ContactsFilter from '../components/ContactsFilter';

const Contacts = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [contacts, setContacts] = React.useState([]);
  const [filter, setFilter] = React.useState('');

  const [editModal, setEditModal] = React.useState({ show: false, contact: null });
  const [deleteModal, setDeleteModal] = React.useState({ show: false, contact: null });
  const [deleteSubmitting, setDeleteSubmitting] = React.useState({ loading: false, error: null });

  const sortedContacts = React.useMemo(() => {
    return [...contacts].sort((a, b) => a.name.localeCompare(b.name));
  }, [contacts]);

  const sortedAndFilteredContacts = React.useMemo(() => {
    return sortedContacts.filter((i) => i.name.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, sortedContacts]);

  React.useEffect(() => {
    contactsService
      .getAll()
      .then((res) => setContacts(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmitCreate = async (values) => {
    const resp = await contactsService.createOne(values);
    setContacts((state) => [...state, resp.data]);
  };

  const handleSubmitUpdate = async (values) => {
    const resp = await contactsService.updateOne(values);
    const updatedContact = resp.data;
    const filteredContacts = contacts.filter((contact) => contact.id !== updatedContact.id);
    setContacts([...filteredContacts, updatedContact]);
    setEditModal({ show: false, contact: null });
  };

  const handleSubmitDelete = async () => {
    setDeleteSubmitting({ loading: true, error: null });
    try {
      await contactsService.deleteOne(deleteModal.contact.id);
      setContacts((state) => state.filter((i) => i.id !== deleteModal.contact.id));
      setDeleteModal({ show: false, contact: null });
      setDeleteSubmitting({ loading: false, error: null });
    } catch (err) {
      setDeleteSubmitting({ loading: false, error: err.message });
    }
  };

  const handleCloseEditModal = () => setEditModal({ show: false, contact: null });
  const handleCloseDeleteModal = () => setDeleteModal({ show: false, contact: null });

  const handleEditBtnClick = (contact) => setEditModal({ show: true, contact: contact });
  const handleDeleteBtnClick = async (contact) => setDeleteModal({ show: true, contact: contact });

  return (
    <Container>
      <Row>
        <Col lg={4}>
          <h4 className='mb-3'>New contact</h4>
          <ContactForm onSubmit={handleSubmitCreate} btnName={'Add contact'} />
        </Col>

        <Col lg={8}>
          <h4 className='mb-3'>Contacts</h4>
          <ContactsFilter filter={filter} setFilter={setFilter} />
          {error ? (
            <Alert variant={'danger'}>{error}</Alert>
          ) : isLoading ? (
            <Spinner as='span' animation='border' size='sm' />
          ) : sortedAndFilteredContacts.length ? (
            <ContactsList
              editContact={handleEditBtnClick}
              deleteContact={handleDeleteBtnClick}
              contacts={sortedAndFilteredContacts}
            />
          ) : (
            'No contacts'
          )}
        </Col>
      </Row>

      <Modal show={editModal.show} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactForm
            values={editModal.contact}
            onSubmit={handleSubmitUpdate}
            btnName={'Update contact'}
          />
        </Modal.Body>
      </Modal>

      <Modal show={deleteModal.show} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Delete contact "{deleteModal.contact?.name}"?</p>
          {deleteSubmitting.error && <Alert variant={'danger'}>{deleteSubmitting.error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleSubmitDelete}>
            {deleteSubmitting.loading && <Spinner as='span' animation='border' size='sm' />} Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Contacts;
