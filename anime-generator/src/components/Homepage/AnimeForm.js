import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import "./css/AnimeForm.css";


function AnimeForm() {
  return (
    <Form className="anime-form-container mt-5">
    <Form.Group className="p-3 mb-3">
      <Form.Control className="form-control" type="email" placeholder="Username" />
      <Form.Text className="text-muted">
        We do not store and account details we only search for your list
      </Form.Text>
      <Form.Check type="checkbox" className="p-1" />
      <LinkContainer to="anime">
      <Button variant="primary" type="submit">
      Submit
    </Button>
    </LinkContainer>
    </Form.Group>
    
  </Form>
  )
}

export default AnimeForm