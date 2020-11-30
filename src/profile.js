import React, { useState } from "react";
import {Card, ListGroup, Button, Form} from "react-bootstrap";
import {Route, Link, Switch} from "react-router-dom";
import Login from "./login.js"
import "./profile.css";

import crackedEggert from "./assets/cracked_eggert.png";

export default function Profile() {
    const [name, setName] = useState("Anonymous");
    const [username, setUsername] = useState("UNSET USERNAME");
    const [email, setEmail] = useState("UNSET EMAIL");
    const [location, setLocation] = useState("UNSET LOCATION");
    const [password, setPassword] = useState("UNSET PASSWORD");
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const viewerID = 123; //Dummy for now, sb passed in through props
    const profileID = 123;
    const sameUser = (viewerID === profileID); //Profile belongs to the user viewing

    
    //Handle when the update password form is submitted + call update password fx to store new pw in Firebase
    function handleFormSubmit(event) {
        event.preventDefault(); //Prevent call of default handler
        console.log("handle form submit");
        console.log("new password: " + password);
        setShowPasswordForm(!showPasswordForm); //Reset boolean so update password button is shown again
    }
    
    //Should update password
    function handleUpdatePassword(event) {
        console.log("user wants to update their password");
        setPassword(event.target.value);
    }

    function handleLogout() {
        //call logout backend fx?
        console.log("user wants to log out");
    }

    return (
        <div>
            <h1 className="text"> {name}'s Profile Page </h1>
            <Card id="profileDisplay" className="bodyText">
                <Card.Img variant="top" id="profilePhoto" src={crackedEggert}/>
                <Card.Body>
                    <Card.Title id="title"> Mr. Egg </Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>@usernameEGG</ListGroup.Item>
                        <ListGroup.Item>Email: ifemailexists@email.com</ListGroup.Item>
                        <ListGroup.Item>Located at: locationifexists</ListGroup.Item>
                    </ListGroup>
                    {sameUser && <div /* Only show update/log out buttons if user owns this profile */>
                        {!showPasswordForm && <Button //Show update pw button if NOT showing form
                            variant="primary" 
                            block  
                            id="profileButton"
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                        >
                            Update Password
                        </Button>}
                        {showPasswordForm && <Form onSubmit={handleFormSubmit} /* Show form only after button clicked */>
                            <Form.Group controlId="updatePassword">
                                <Form.Label>New password:</Form.Label> 
                                <Form.Control
                                    type="password"
                                    onChange={(event) => handleUpdatePassword(event)}
                                    placeholder="Enter your new password"
                                />
                            </Form.Group>
                        </Form>}
                        <Button 
                            variant="primary" 
                            block 
                            id="profileButton"
                            onClick={handleLogout}
                        >
                            <Link to="/login" class="buttonText">
                                Log out
                            </Link>
                            <Switch>
                                <Route path="/login" component={Login}/>
                            </Switch>
                        </Button>
                    </div> }
                </Card.Body>
            </Card>
        </div>
    );
}