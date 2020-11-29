import React, { useState } from "react";
import ImagePicker from 'react-image-picker'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Route, Link, Switch } from 'react-router-dom';
import 'react-image-picker/dist/index.css'
import "./Signup.css";

//import images from local
import eggert from './assets/eggert.jpg'
import smallberg from './assets/smallberg.jpg'
import nachenberg from './assets/nachenberg.jpg'
import reinman from './assets/reinman.jpg'

const width = window.innerWidth
const margin = (width - 650)/2

const imageList = [smallberg, nachenberg, reinman, eggert]
export default function Image() {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');

    function validateForm() {
        return name.length > 0 && image.length > 0
    }

    function handleSubmit(event) {
        event.preventDefault();
    }
    

    function onPick(image) {
        setImage(image)
    }

    return (
        <div className='header'>
            <h3>Choose a Profile Photo</h3>
            <div style={{marginLeft:margin, marginBottom:'3%'}}>
                <ImagePicker 
                    images={imageList.map((image, i) => ({src: image, value: i}))}
                    onPick={(image) => onPick(image)}
                />
            </div>
            <Button type="button" variant='light' onClick={() => console.log(image)}>Set</Button>
            <div className="Login">
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label className='text'>Name: </Form.Label>
                        <Form.Control
                            autoFocus
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Link to='/image'>
                        <Button block size="lg" type="submit" disabled={!validateForm()} variant="light">
                            Create Account
                        </Button>
                    </Link>
                </Form>
            </div>
        </div>
    )
}
