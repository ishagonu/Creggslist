import React, { useState } from "react";
import {Card, ListGroup, Button, Form} from "react-bootstrap";
import {Route, Link, Switch} from "react-router-dom";
import Login from "./login.js"
import "./profile.css";

import crackedEggert from "./assets/cracked_eggert.png";

export default function Profile() {
    const [name, setName] = useState("Anonymous");
    const [username, setUsername] = useState("username unknown");
    const [email, setEmail] = useState("UNSETEMAIL");
    const [phonenNumber, setPhoneNumber] = useState("UNSETPHONE");
    const [location, setLocation] = useState("UNSETLOCATION");

    const viewerID = 13; //Dummy for now, sb passed in through props
    const profileID = 123;
    const sameUser = (viewerID === profileID); //Profile belongs to the user viewing

    //Return form that allows user to edit their name, username, password, email, phone number, location
    function handleEdit() {
        //update user information
        console.log("user wants to edit their profile");

        return (
            <Form>
                <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label> 
                    <Form.Control>
                        Name goes here, edit
                    </Form.Control>
                </Form.Group>

            </Form>
        );

        /*<div className="Login">
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
          </div> */
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
                        <ListGroup.Item>Phone number: 123456789</ListGroup.Item>
                        <ListGroup.Item>Located at: locationifexists</ListGroup.Item>
                    </ListGroup>
                    <div>
                        {sameUser && <Button 
                            variant="primary" 
                            block  
                            id="profileButton"
                            onClick={handleEdit}
                        >
                            Edit Profile
                        </Button> /* Only show edit button is user owns this profile */ }
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
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}