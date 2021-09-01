import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';

import AuthContext from '../context/AuthContext';

const AuthButton = ({ user }) => {
  return <Button onClick={user.logOut}>LogOut</Button>;
};

const Navbarr = () => {
  const user = React.useContext(AuthContext);
  return (
    <Navbar bg='light' expand='lg' className='mb-3'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='mr-auto navbar-brand'>
          Notepad
        </Navbar.Brand>
        {user.isLoggedIn && <AuthButton user={user} />}
      </Container>
    </Navbar>
  );
};

export default Navbarr;
