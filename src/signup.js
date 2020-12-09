import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Route, Link, Switch, Redirect } from 'react-router-dom';
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

export default class Signup extends React.Component {
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      name:'',
      error:false,
      image:'',
      redirect:false
    }
  }

    onPick(image) {
      this.setState({image: image})
  }
  
    validateForm() {
      if(this.state.email.length > 0 && this.state.password.length > 0)
      {
        this.createAccount()
      }
    }
  
    async verifyEmail(){
      await accountsApi.checkEmail(this.state.email).then(res => {
        return true
      }).catch(err => {
        console.log(err)
        this.setState({error:true})
        return false
      })
    }

    async verifyPassword(){
      await accountsApi.checkPassword(this.state.password).then(res => {
        return true
      }).catch(err => {
        console.log(err)
        this.setState({error:true})
        return false
      })
    }

    async createAccount() {
      if(this.verifyEmail()){
        if(this.verifyPassword()){
          console.log(this.state.name)
          await accountsApi.createUser(this.state.name, this.state.password, this.state.email, this.state.image).then( res =>
            this.setState({redirect: true})
          ).catch(err => {
            console.log(err)
            this.setState({error: true})
          })
        }
      }
    }

     handleSubmit(event) {
      event.preventDefault();
    }
  
      render(){
        if (this.state.redirect) {
          return <Redirect push to="/home" />;
        }

        return (
          <div>
            {this.state.error && (
              <Alert variant="danger" onClose={() => this.setState({error:false})} dismissible>
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
                      onPick={(image) => this.setState({image: image})}
                  />
              </div>
            </div>
            <div className="Login">
              <Form onSubmit={() => this.handleSubmit()}>
              <Form.Group size="lg" controlId="name">
                <Form.Label className='text'>Name: </Form.Label>
                <Form.Control
                  type="name"
                  value={this.state.name}
                  onChange={(e) => this.setState({name: e.target.value})}
                />
              </Form.Group>
                <Form.Group size="lg" controlId="email">
                  <Form.Label className='text'>Email: </Form.Label>
                  <Form.Control
                    autoFocus
                    type="email"
                    value={this.state.email}
                    onChange={(e) => this.setState({email: e.target.value})}
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                <Form.Label className='text'>Password: </Form.Label>
                <Form.Control
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.setState({password:e.target.value})}
                />
              </Form.Group>
              <Link to='/home'>
                <Button block size="lg" type="submit" disabled={!this.validateForm()} variant="light">
                  Sign Up
                </Button>
              </Link>
            </Form>
          </div>
          <Switch>
            <Route path='/home' component={Home} />
          </Switch>
        </div>
      );
      }
  }
