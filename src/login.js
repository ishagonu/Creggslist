import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Route, Link, Switch } from 'react-router-dom';
import Signup from './signup.js'
import "./Login.css";
import posts from './postsApi.js'
posts.createPost('hubert@example.com', ['key', 'rice'], 'rice', 94536, 'food', 100.01, 'fried rice')
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

    return (
        <div>
          <h1 id='title' className='text'>Login</h1>
          <div className="Login">
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label className='text'>Email/Username: </Form.Label>
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
              <Link to="/home"><Button block size="lg" type="submit" disabled={!validateForm()} variant="light">
                Login
              </Button>
              </Link>
            </Form>
          </div>
          <p className='text'>Don't have an account? Click <Link to="/signup" id="link">here</Link> to sign in</p>
          <Switch>
            <Route path='/signup' component={Signup} />
          </Switch>
        </div>
      );
}