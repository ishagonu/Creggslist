import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popup from "reactjs-popup";
import { Route, Link } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import "./Signup.css"

export default function Signup() {
    const [email, setEmail] = useState('');
    const [name, setname] = useState('');
    const [password, setPassword] = useState('');
  
    function validateForm() {
      return email.length > 0 && name.length > 0
    }
  
    function handleSubmit(event) {
      event.preventDefault();
    }
  
      return (
          <div>
            {/* <header className='top'> */}
              <h3 className='text' id='title' >Sign up</h3>
            {/* </header> */}
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
                  <Form.Label className='text'>Name: </Form.Label>
                  <Form.Control
                    type="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
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
                <Button block size="lg" type="submit" disabled={!validateForm()} variant="light">
                  Sign Up
                </Button>
              </Form>
            </div>
            <Popup trigger={<button className="button"> Open Modal </button>} modal>
                <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
                    Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
                    delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
                    commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
                    explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
                </span>
            </Popup>
          </div>
        );
  }