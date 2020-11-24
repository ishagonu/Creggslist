import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Route, Link, Switch } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import "./Signup.css";
import Login from './login.js'
import Image from './image.js'

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    function validateForm() {
      return email.length > 0 && password.length > 0
    }
  
    function handleSubmit(event) {
      event.preventDefault();
    }
  
      return (
          <div>
            <h3 className='text' id='title' >Sign up</h3>
            <div className="Login">
              <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                  <Form.Label className='text'>Email: </Form.Label>
                  <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                <Form.Label className='text'>Password: </Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Link to='/image'>
                <Button block size="lg" type="submit" disabled={!validateForm()} variant="light">
                  Sign Up
                </Button>
              </Link>
            </Form>
          </div>
          <Switch>
            <Route path='/image' component={Image} />
          </Switch>
        </div>
      );
  }