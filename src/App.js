import React from "react";
import Login from './login.js';
import Signup from './signup.js';
import Home from './home.js';
import './App.css';
import {Switch, Route, Link, Redirect} from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1 id='header'>Welcome to Creggslist!</h1>
        </header>
        <Redirect exact from="/" to="/login" />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/home' component={Home} />
        </Switch>
      </div>
    )
  }
}