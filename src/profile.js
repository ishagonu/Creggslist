import React from "react";
import { Card, ListGroup, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Route, Link, Switch } from "react-router-dom";
import Login from "./login.js"
import "./profile.css";

//import images from local
import eggert from './assets/eggert.jpg'
import smallberg from './assets/smallberg.jpg'
import nachenberg from './assets/nachenberg.jpg'
import reinman from './assets/reinman.jpg'
import crackedEggert from "./assets/cracked_eggert.png";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        //const {viewerID, profileID} = this.props;
        this.state = {
            //Set up data: set name, username, etc from firebase + call choosephoto fx
            //const {viewerID, profileID} = this.props;
            viewerID: 123, //Dummy for now, sb passed in through props
            profileID: 123,
            sameUser: false, //Profile belongs to the user viewing
            name: null,
            username: null,
            photo: crackedEggert,
            email: null,
            location: null,
            password: null,
            showPasswordForm: false,
            userPosts: [], //post information for this user's posts
            hasPosts: false, //if user has posts or not
        };

        //Bind functions just in case
        this.choosePhoto = this.choosePhoto.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
    }

    //When profile screen mounts, set up data for the user profile
    componentDidMount() {
        const { viewerID, profileID, userPosts } = this.state;
        //Get name, email, etc info from firebase
        this.setState({
            sameUser: viewerID === profileID,
            hasPosts: userPosts.length === 0 ? false : true,
        });
    }

    //When profile screen unmounts, unsubscribe from firestore
    componentWillUnmount() {
    }

    //Set which profile image to display
    choosePhoto(photoID) {
        switch (photoID) {
            case "eggert":
                return eggert;
            case "smallberg":
                return smallberg;
            case "nachenberg":
                return nachenberg;
            case "reinman":
                return reinman;
            default:
                return crackedEggert;
        }
    }

    //Handle when the update password form is submitted + call update password fx to store new pw in Firebase
    handleFormSubmit(event) {
        const { password, showPasswordForm } = this.state;
        event.preventDefault(); //Prevent call of default handler
        console.log("handle form submit, new password: " + password);
        this.setState({ showPasswordForm: !showPasswordForm }); //Reset boolean so update password button is shown again
    }

    //Should update password
    handleUpdatePassword(event) {
        console.log("user wants to update their password");
        this.setState({ password: event.target.value });
    }

    handleLogout() {
        //call logout backend fx?
        console.log("user wants to log out");
        return (
            <Switch>
                <Route exact path='/login' component={Login} />
            </Switch>
        );
    }

    render() {
        const { name, photo, username, sameUser, email, location, showPasswordForm, hasPosts } = this.state;
        return (
            <Container className="entireContainer" fluid>
                <Row id="headerContainer" bsPrefix="headerContainer">
                    <h1 className="smallerHeaderText"> {name ? name : "Anonymous"}'s Profile Page </h1>
                </Row>
                <Row>
                    <Col /*bsPrefix overrides for custom CSS */ id="profileContainer" bsPrefix="profileContainer">
                        <Card className="bodyText">
                            <Card.Img variant="top" id="profilePhoto" src={photo} />
                            <Card.Body>
                                <Card.Title id="title"> Mr. Egg </Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>@{username ? username : "Username unknown"}</ListGroup.Item>
                                    <ListGroup.Item>Email: {email ? email : "Email unknown"}</ListGroup.Item>
                                    <ListGroup.Item>Located at: {location ? location : "Location unknown"}</ListGroup.Item>
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
                                                onChange={(event) => this.handleUpdatePassword(event)}
                                                placeholder="Enter your new password"
                                            />
                                        </Form.Group>
                                    </Form>}
                                    <Button
                                        variant="primary"
                                        block
                                        id="profileButton"
                                        onClick={this.handleLogout}
                                    >
                                        <Link to="/login" className="buttonText">
                                            Log out
                                        </Link>
                                    </Button>
                                </div>}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="postContainer" bsPrefix="postContainer">
                        <div className="postContainer">
                            {hasPosts && <h1> TODO make posts </h1>}
                            {!hasPosts && <h1> no posts yet :( </h1>}
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}