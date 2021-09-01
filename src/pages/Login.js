import React, { useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import { usersService } from '../api/apiService';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const user = useContext(AuthContext);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const resp = await usersService.login(values);
        user.logIn(resp.data.user);
      } catch (e) {
        setSubmitting(false);
        setFieldError('auth', e.message);
        inputRef.current.focus();
      }
    },
  });

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col lg={4}>
          <h3 className='mb-3'>LogIn</h3>

          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.email}
                name='email'
                autoComplete='email'
                isInvalid={formik.errors && formik.errors.email}
                ref={inputRef}
              />
              <Form.Control.Feedback type='invalid'>
                {formik.errors && formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                onChange={formik.handleChange}
                value={formik.values.password}
                name='password'
                autoComplete='current-password'
                isInvalid={formik.errors && formik.errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {formik.errors && formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              disabled={formik.isSubmitting || formik.errors.password || formik.errors.email}
              type='submit'
              variant='outline-primary'
              className='w-100 mb-3'
            >
              {formik.isSubmitting ? <Spinner as='span' animation='border' size='sm' /> : 'LogIn'}
            </Button>
          </Form>
          {formik.errors && formik.errors.auth ? (
            <Alert variant={'danger'}>{formik.errors.auth}</Alert>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
