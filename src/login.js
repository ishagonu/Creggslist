import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Route, Link, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Signup from './signup.js'
import Home from './home.js'
import "./Login.css";
import accountsApi from './accountsApi.js'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)
  const [redirect, setRedirect] = useState(false)


  async function login(){
    await accountsApi.verifyAccount(email, password).then(res =>
      setRedirect(true)
      ).catch(err => {
        console.log(err)
        setError(true)
      })
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  }


    if (redirect) {
      // return <Redirect push to="/home"/>;
      return <Route><Home email={email}/></Route>
    }
    else {
      return (
        <div>
          {error && (
            <Alert variant="danger" onClose={() => setError(false)} dismissible>
              <Alert.Heading>Oh no! You got egged!</Alert.Heading>
              <p>
                So sorry! Please try again.
              </p>
            </Alert>
          )}
          <h1 id='title' className='text'>Login</h1>
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
                <Button block size="lg" type="submit" disabled={!validateForm()} variant="light" onClick={() => login()}>
                  Login
                </Button>
            </Form>
          </div>
          <p className='text'>Don't have an account? Click <Link to="/signup" id="link">here</Link> to sign up</p>
          <Switch>
            <Route path='/signup' component={Signup} />
          </Switch>
        </div>
      );
    }
}