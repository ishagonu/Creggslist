import React from "react";
import {Route, Link, Switch} from 'react-router-dom';
import Make_Post from './make-post.js'

export default class Home extends React.Component{
    render(){
        return(
	    <div>
		<p>This is Home</p>
		<p className = 'text'><Link to="/make-post" id="link">Make Post</Link></p>
		<Switch>
		    <Route path = '/make-post' component={Make_Post}/>
		</Switch>
	    </div>
        );
    }
}
