import React from "react";
import { Alert, Card, ListGroup, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Route, Link, Switch } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai"

import Login from "./login.js"
import Home from './home.js'
import accountsApi from "./accountsApi.js";
import postsApi from './postsApi.js';
import Item_Info from "./item-info.js";
import "./profile.css";

//import default image from local
import crackedEggert from "./assets/cracked_eggert.png";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Set up data: set name, etc from firebase fx
            viewerEmail: this.props.viewerEmail, // "hwang12@ucla.edu",
            profileEmail: this.props.profileEmail, //"junho.choix10@gmail.com",
            sameUser: false, //Whether profile belongs to the user viewing
            name: null,
            photo: crackedEggert,
            showPasswordForm: false,
            password: null,
            userPosts: [], //post information for this user's posts
            error: null, //contains something to be displayed if there is an error
            goHome: false,
            gotoLogin: false,
        };

        //Bind functions to keep "this" context
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    //When profile screen mounts, set up data for the user profile (user's info and posts)
    componentDidMount() {
        const { viewerEmail, profileEmail } = this.state;

        //Get name, email, photo, and password info from accounts database
        postsApi.getPosts(profileEmail)
            .then((result) => (
                this.setState({ userPosts: result.postList === null ? [] : result.postList })
            )).catch((err) => {
                console.log(`Oh no! Get user posts ${err}`);
                this.setState({ error: err });
            });

        //Get user posts w/ posts query
        accountsApi.getUser(profileEmail)
            .then((result) => (
                //console.log("get users posts " + result.postList)
                this.setState({
                    email: result.email,
                    name: result.name,
                    photo: result.photo ? result.photo : crackedEggert,
                })
            )).catch((err) => {
                console.log(`Oh no! Get user info ${err}`);
                this.setState({ error: err });
            });

        this.setState({
            sameUser: viewerEmail === profileEmail,
            goHome: false, //Set goHome + gotoLogin to be false in 
            gotoLogin: false,
        });
    }

    //Handle when the update password form is submitted + call update password fx to store new pw in Firebase
    async handleFormSubmit(event) {
        event.preventDefault(); //Prevent call of default handler
        const { profileEmail, password, showPasswordForm } = this.state;
        await accountsApi.updatePassword(password, profileEmail)
            .catch((err) => {
                console.log(`Oh no! Password update error: ${err}`);
                this.setState({ error: err });
            });
        this.setState({ showPasswordForm: !showPasswordForm }); //Reset boolean so update password button is shown again
    }

    render() {
        const { name, photo, sameUser, viewerEmail, profileEmail,
            showPasswordForm, userPosts, error, goHome, gotoLogin } = this.state;

        if (goHome === true) { //If user clicks home button, this will redirect to home screen
            return (
                <div>
                    <Switch>
                        <Route><Home email={viewerEmail}/></Route>
                    </Switch>
                </div>
            );
        }
        if (gotoLogin === true) { //If user has clicked logout button, redirect to login screen
            return (
                <div>
                    <Switch>
                        <Route exact path="/login"><Login /> </Route>
                    </Switch>
                </div>
            );
        }

        return ( //If not redirecting to Home, render the profile screen
            <div>
                {error && ( //Alert box pops up if there is an error
                    <Alert variant="danger" onClose={() => this.setState({ error: !error })} dismissible>
                        <Alert.Heading>Oh no! You got egged!</Alert.Heading>
                        <p>
                            So sorry! Please try again.
                  </p>
                    </Alert>
                )}
                <Container className="entireContainer" fluid>
                    <Row id="headerContainer" bsPrefix="headerContainer">
                        <Row className="profileHeader">
                            <h1 className="smallerHeaderText"> {name ? name : "Anonymous"}'s Profile Page </h1>&nbsp;
				  <button className='homeButton btn btn-outline-info' style={{width:'100%'}} style={sameUser ? null : {display:'none'}} onClick={() => this.setState({ goHome: !goHome })}>
                                    <AiOutlineHome className="homeIcon" /> Home
					</button>
				</Row>
			
				</Row>
				

				<Row>
				    <Col /*bsPrefix overrides for custom CSS */ id="profileContainer" bsPrefix="profileContainer">
					   <Card className="bodyText">
                                <Card.Img variant="top" id="profilePhoto" src={photo} />
                                <Card.Body>
                                    <Card.Title id="title"> {name} </Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Username: {name ? name : profileEmail}</ListGroup.Item>
                                        <ListGroup.Item>Email: {profileEmail ? profileEmail : "Email unknown"}</ListGroup.Item>
                                    </ListGroup>
                                    {sameUser && <div /* Only show update/log out buttons if user owns this profile */>
                                        {!showPasswordForm && <Button //Show update pw button if NOT showing form
                                            variant="primary"
                                            block
                                            id="profileButton"
                                            onClick={() => this.setState({ showPasswordForm: true })}
                                        >
                                            Update Password
                                    </Button>}
                                        {showPasswordForm && <Form onSubmit={this.handleFormSubmit} /* Show form only after button clicked */>
                                            <Form.Group controlId="updatePassword">
                                                <Form.Label>New password:</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    onChange={(event) => this.setState({ password: event.target.value })}
                                                    placeholder="Enter your new password"
                                                />
                                            </Form.Group>
                                        </Form>}
                                        <Button
                                            variant="primary"
                                            block
                                            id="profileButton"
                                            onClick={() => this.setState({ gotoLogin: !gotoLogin })}
                                        >
                                            Log out!
                                        </Button>
                                    </div>}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="postContainer" bsPrefix="postContainer">
                            <div className="postContainer">
                                {userPosts.length === 0 && <h1> User hasn't made any posts yet :( </h1>}
                                {userPosts.length !== 0 &&
                                    userPosts.map((post, index) => (
                                        <div>
                                            <Item_Info
                                                img_link={post.photo ? post.photo : crackedEggert}
                                                name={post.title}
                                                descript={post.content ? post.content : "No description"}
                                                price={post.price ? post.price : "Free"}
                                                zip={post.location ? post.location : "Location unknown"}

                                                email={post.author_email ? post.author_email : "eggert@ucla.edu"}
						from='profile'
                                            />
                                            <hr className="postDivider" />
                                        </div>
                                    ))
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
