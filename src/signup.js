import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Route, Link, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import "./Signup.css";
import Login from './login.js'
import Home from './home.js'
import accountsApi from './accountsApi.js'

import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import eggert from './assets/eggert.jpg'
import smallberg from './assets/smallberg.jpg'
import nachenberg from './assets/nachenberg.jpg'
import reinman from './assets/reinman.jpg'

const width = window.innerWidth
const margin = (width - 650)/2
const imageList = [smallberg, nachenberg, reinman, eggert]

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [redirect, setRedirect] = useState(false)
  
    function validateForm() {
      return email.length > 0 && password.length > 0 && name.length > 0 && image.length !== ''
    }
  
    async function verifyEmail(){
      await accountsApi.checkEmail(email).then(res => {
        return true
      }).catch(err => {
        console.log(err)
        setError(true)
        return false
      })
    }

    async function verifyPassword(){
      await accountsApi.checkPassword(password).then(res => {
        return true
      }).catch(err => {
        console.log(err)
        setError(true)
        return false
      })
    }

    async function createAccount() {
      if(verifyEmail()){
        if(verifyPassword()){
          await accountsApi.createUser(name, password, email, image.src ).then( res => {
            setRedirect(true)
          }).catch(err => {
            // console.log(err)
            setError(true)
          })
        }
      }
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
              <div className='header'>
                <h3 className='text' id='title' >Sign up</h3>
                <h3>Choose a Profile Photo</h3>
                <div style={{marginLeft:margin, marginBottom:'3%'}}>
                    <ImagePicker 
                        images={imageList.map((image, i) => ({src: image, value: i}))}
                        onPick={(image) => setImage(image)}
                    />
                </div>
              </div>
              <div className="Login">
                <Form  onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="name">
                  <Form.Label className='text'>Name: </Form.Label>
                  <Form.Control
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
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
                  <Button block size="lg" type="submit" disabled={!validateForm()} variant="light" onClick={() => createAccount()}>
                    Sign Up
                  </Button>
              </Form>
            </div>
            <Switch>
              <Route path='/home' component={Home} />
            </Switch>
          </div>
        );
        }
  }
