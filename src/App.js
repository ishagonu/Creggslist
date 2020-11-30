import React from "react";
import Login from './login.js';
import Signup from './signup.js';
import Image from './image.js'
import Home from './home.js';
import Profile from './profile.js';
import './App.css';
import {Switch, Route, Link, Redirect} from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1 id='header'>Welcome to Creggslist!</h1>
        </header>
        <Redirect exact from="/" to="/profile" />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/home' component={Home} />
          <Route path='/image' component={Image} />
          <Route path='/profile' component = {Profile} />
        </Switch>
      </div>
    )
  }
}