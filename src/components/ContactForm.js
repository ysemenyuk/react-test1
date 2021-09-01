import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

function ContactForm({ values, onSubmit, btnName }) {
  const formik = useFormik({
    initialValues: {
      id: values?.id,
      name: values?.name || '',
      email: values?.email || '',
      phone: values?.phone || '',
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm, setSubmitting, setFieldError }) => {
      try {
        await onSubmit(values);
        resetForm();
      } catch (e) {
        setSubmitting(false);
        setFieldError('server', e.message);
      }
    },
  });

  return (
    <>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group className='mb-3' controlId='formName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.name}
            name='name'
            autoComplete='name'
            isInvalid={formik.touched.name && formik.errors.name}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.touched.name && formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.email}
            name='email'
            autoComplete='email'
            isInvalid={formik.touched.email && formik.errors.email}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.touched.email && formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formPhone'>
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type='phone'
            onChange={formik.handleChange}
            value={formik.values.phone}
            name='phone'
            autoComplete='current-phone'
            isInvalid={formik.touched.phone && formik.errors.phone}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.touched.phone && formik.errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={formik.isSubmitting}
          type='submit'
          variant='outline-primary'
          className='w-100 mb-3'
        >
          {formik.isSubmitting && <Spinner as='span' animation='border' size='sm' />} {btnName}
        </Button>
      </Form>
      {formik.errors.server && <Alert variant={'danger'}>{formik.errors.server}</Alert>}
    </>
  );
}

export default ContactForm;
