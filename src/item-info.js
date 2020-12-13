import React from 'react';
import Button from 'react-bootstrap/Button'

import {Route, Link, Switch} from 'react-router-dom'
import './item-info.css'

import {IoNavigateCircleOutline, IoAlertCircleOutline, IoPinOutline} from 'react-icons/io5';
import {AiOutlineMail, AiFillDelete} from 'react-icons/ai';
import {FiArrowRightCircle} from 'react-icons/fi';
import {BiMoney} from 'react-icons/bi';
import {BsPeopleCircle} from 'react-icons/bs'

import Profile from "./profile.js"
import PostApi from './postsApi.js'

export default function Item_Info(props){
    const [showProfile, setShowProfile] = React.useState(false);

    let isUsersPost = () => {return props.viewerEmail  === props.email}
    let isProfileView = () => {return props.from === 'profile'}

    let deletePost = () => {
	if(props.from === 'make-post') {
	    alert("This button is disabled because you haven't actually posted this yet!")
	}else{
	    // PostsApi.removePost(props.
	    alert("In progress") 
	}

    }
    let displayedButton = () => {
	if (!isProfileView()){
	    if(!isUsersPost()){
		return(
		    <button class='toProfileButton' onClick={()=> setShowProfile(true)}><FiArrowRightCircle style={{color:'blue'}}/></button>
		)
	    }else{
		return(
		    <div>
			<br/>
			<button type="button" class="btn btn-danger" onClick={()=> deletePost()}><AiFillDelete/>  Delete</button>
		    </div>
		)
	    }
	}
    }
    if(showProfile){
	return (
	    <div>
		<Route><Profile viewerEmail={props.viewerEmail} profileEmail={props.email}/></Route>
	    </div>

	)
    }else{
	return(
	    <div className={isProfileView() ? 'item-info_item-view' : 'item-info_profile-view'} >
		<div style={{display: 'inline-block'}}>
		    <img src={props.img_link} alt='error' width='350'/>
		    <br/>
		    <br/>
		    <h3>{props.name}</h3>
		    <p className='item-descript'><IoAlertCircleOutline/> <span style={{fontWeight: 'bold'}}> Description :</span> {props.descript}</p>
		</div>

		<br/>
		<p className='item-price'> <BiMoney/> <span style={{fontWeight: 'bold'}}> Price :</span> ${props.price}  </p>
		<p className='item-zip'><IoNavigateCircleOutline/><span style={{fontWeight: 'bold'}}> Area :</span> {props.zip}</p>
		<p className='item-contact'><AiOutlineMail/><span style={{fontWeight: 'bold'}}> Contact :</span> {props.email}{displayedButton()}</p>
	    </div>
	    
	)
    }

}
