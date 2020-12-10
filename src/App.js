import React from "react";
import Login from './login.js';
import Signup from './signup.js';
import Image from './image.js';
import Home from './home.js';
import Profile from './profile.js';
import Make_Post from './make-post.js';


import './App.css';
import {Switch, Route, Link, Redirect} from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1 id='header'>Welcome to Creggslist!</h1>
        </header>
        <Redirect exact from="/" to="/Login" />
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/home' component={Home} />
            <Route path='/profile' component={Profile} />
            <Route path='/image' component={Image} />
	          <Route path='/make-post' component={Make_Post} />
        </Switch>
      </div>
    )
  }
}
