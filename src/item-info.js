import React from 'react';
import Button from 'react-bootstrap/Button'

import {Route, Link, Switch} from 'react-router-dom'
import './item-info.css'

import {IoNavigateCircleOutline, IoAlertCircleOutline, IoPinOutline} from 'react-icons/io5';
import {AiOutlineMail, AiFillDelete, AiFillEdit} from 'react-icons/ai';
import {FiArrowRightCircle} from 'react-icons/fi';
import {BiMoney} from 'react-icons/bi';
import {BsPeopleCircle, BsPencil} from 'react-icons/bs'

import Profile from "./profile.js"
import PostsApi from './postsApi.js'

export default function Item_Info(props){
    const [showProfile, setShowProfile] = React.useState(false);
    const [showEditor, setShowEditor] = React.useState(false);
    const [description, setDescription] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [item_title, setItemTitle] = React.useState('');
    const [item_price, setPrice] = React.useState(null);
    
    let isUsersPost = () => {return props.viewerEmail  === props.email}
    let isProfileView = () => {return props.from === 'profile'}
    let openProfileView = () => {
	setShowProfile(true)
	props.setModalSetting('profile-view')

    }
    let deletePost = () => {
	if(props.from === 'make-post') {
	    alert("This button is disabled because you haven't actually posted this yet!")
	}else{
	    if(window.confirm('Are you sure that you want to delete this post?')){
		PostsApi.removePost(props.item_id).then(res => {
		    alert('Success, your post is now deleted!')
		    props.closeItemInfo()
		}).catch((err) =>{
		    alert('There has been an error while completing your request. Please try again later.')
		})
	    }
	}
    }
    
    let validateForm = () => {
	return item_title.length > 0 || description.length > 0 || zip.length > 0 || (item_price !== null &&  item_price > 0)
    }
    
    let editPost = () => {
	if(props.from === 'make-post') {
	    alert("This button is disabled because you haven't actually posted this yet!")
	}else{
	    setShowEditor(true)
	    props.setModalSetting('edit-view') // Set modal size for editing view
	}
    }

    let exitEditView = () => {
	setShowEditor(false)
	props.setModalSetting()
    }
    let displayedButton = () => {
	if (!isProfileView()){ // Buttons for others' post view
	    if(!isUsersPost()){
		return(
		    <button class='toProfileButton' onClick={()=> openProfileView()}><FiArrowRightCircle style={{color:'#1e5364'}}/></button>
		)
	    }else if (!showEditor){ // Buttons for own post view
		return(
		    <div style={{textAlign:'right', marginRight:'10%'}}>
			<br/>
			<button type="button" class="btn btn-outline-danger" onClick={()=> deletePost()}><AiFillDelete/>  Delete</button>&nbsp;
			
			<button type='button' class='btn btn-outline-success' onClick={() => editPost()}><AiFillEdit/></button>
			

		    </div>
		)
	    }else{ // Buttons for editing view
		return(
		    <div style={{textAlign:'right'}}>
			<br/>
			<button type="button" class="btn btn-outline-danger" onClick={()=> deletePost()}><AiFillDelete/>  Delete</button>&nbsp;			
			
			<button className='btn btn-outline-primary' style={{right:'0px',  float:'right'}} onClick={() => {exitEditView()}}> Cancel </button>
			<button className='btn btn-outline-success' style={{right:'0px',  float:'right', marginRight:'2%'}} onClick={() => submitEditedPost()} disabled={!validateForm()} >
			   <AiFillEdit/> Post Edit
			</button>

		    </div>
		)
	    }
	}
    }
    let validInputs = () => {
	var errorMessage = [];

	if(zip !== '' && (zip.length !==5 || isNaN(Number(zip)))){
	    errorMessage.push('Enter a valid Zip Code (5 digit number)');	    
	}
	if(item_price !== null && (isNaN(parseFloat(item_price)))){
	    errorMessage.push('Please enter a valid price');
	}

	if (errorMessage.length > 0) {
	    alert('Please fix the following issues : \n' + errorMessage.join('\n'));
	    errorMessage = [];
	    return false;
	}else{
	    return true;
	}
    }
    let formattedChanges = () => { // Formats the edits to allow API to handle edit
	var newContent = {
	}
	if(item_title !== ''){
	    newContent.title = item_title
	}
	if(description !== ''){
	    newContent.content = description
	}
	if(item_price !== null){
	    newContent.price = parseFloat(item_price)
	}
	if(zip !== ''){
	    newContent.location =  zip
	}

	return newContent

    }
    let clearInputs = () => { // Clear inputs after edits are submitted
	setItemTitle('')
	setDescription('')
	setZip('')
	setPrice(null)
    }
    let submitEditedPost = () => {
	if(!validInputs()){return}
	let content = formattedChanges()
	PostsApi.updatePost(props.item_id, content).then(res => {
	    alert('Success, your post has been edited!')
	    props.setModalSetting()
	    props.closeItemInfo()
	    clearInputs()
	    setShowEditor(false)
	}).catch((err) =>{
	    alert('There has been an error while completing your request. Please try again later.')
	})
	
    }
    
    let formattedPrice = (unformattedPrice) => { // Price formatted for display
	var price = (unformattedPrice.toString()).split('.')
	if(price[price.length - 1].length !== 2){
	    return price.join('.') + '0'
	}else{
	    return price.join()
	}
    }
    if(showProfile){ // Redirect to profile page

	return (
	    <div>
		<Route><Profile viewerEmail={props.viewerEmail} profileEmail={props.email}/></Route>
	    </div>

	)
    }else if(showEditor){ // Edit view
	return(
	    <div className='item-info_container'> 
		<h1 style={{fontWeight:'bold'}}> Edit View </h1>
		<div className={isProfileView() ? 'item-info_profile-view' : 'item-info_item-view'} style={{width:'100%'}}>
		    

		    <img src={props.img_link} alt='error' width='350'/>
		    <br/>
		    <br/>
		    <p className='item-title'>
			<span style={{fontWeight: 'bold'}}> Title :</span>
			<input class='form-control' type='text' id='item_title' placeholder={props.name}
			       value={item_title}
			       onChange={(e) => setItemTitle(e.target.value)}
			/>
		    </p>
		    <p className='item-descript'>
			<IoAlertCircleOutline/> <span style={{fontWeight: 'bold'}}> Description :</span>
			<textarea class='form-control' type='text' id='description' rows='5' placeholder={props.descript}
				  value={description}
				  onChange={(e) => setDescription(e.target.value)}
			/>
		    </p>


		    <p className='item-price'>
			<BiMoney/> <span style={{fontWeight: 'bold'}}> Price :</span>
			<div className='input-group'>
			    <div className='input-group-prepend'>
				<div class='input-group-text'>$</div>
			    </div>
			    <input class='form-control' type='text' id='description' placeholder={formattedPrice(props.price)}
				   value={item_price}
				   onChange={(e) => setPrice(e.target.value)}
			    />
			</div>
		    </p>
		    <p className='item-zip'>
			<IoNavigateCircleOutline/><span style={{fontWeight: 'bold'}}> Area :</span>
			<input class='form-control' type='text' id='description' placeholder={props.zip}
			       value={zip}
			       onChange={(e) => setZip(e.target.value)}
			/>
		    </p>
		    

		    <p className='item-contact'><AiOutlineMail/><span style={{fontWeight: 'bold'}}> Contact :</span> {props.email}{displayedButton()}</p>
		    
		</div>
	    </div>
	)	
    }else{ // Regular post view
	return(
	    // Display posts different depending on what page it's being viewed from
	    <div className='item-info_container'>
	    	<h1  style={isProfileView() ? {display:'none'} : null}> Post View </h1>
		<div className={isProfileView() ? 'item-info_profile-view' : 'item-info_item-view'} style={isProfileView() ? null : {display:'flex', flexDirection: 'row'}}>
		    <br/>
		    <img src={props.img_link} alt='error' width='350'/>

		    <div className={isProfileView() ? null : 'verticalLine'}>
			<div style={isProfileView() ? null : {paddingLeft:'10%'}}>
			    <h3 style={{color:'black'}}>{props.name} <i style={props.isEdited ? {fontSize:'12px'} : {display:'none'}}> <AiFillEdit style={{color:'green'}}/> edited</i></h3> 
			    <div style={isProfileView() ? null : {marginLeft:'5%'}}>
				<p className='item-descript'><IoAlertCircleOutline/> <span style={{fontWeight: 'bold'}}> Description :</span> {props.descript}</p>	
				<p className='item-price'> <BiMoney/> <span style={{fontWeight: 'bold'}}> Price :</span> ${formattedPrice(props.price)}  </p>
				<p className='item-zip'><IoNavigateCircleOutline/><span style={{fontWeight: 'bold'}}> Area :</span> {props.zip}</p>
				<p className='item-contact'><AiOutlineMail/><span style={{fontWeight: 'bold'}}> Contact :</span> {props.email}{displayedButton()}</p>
			    </div>
			</div>
		    </div>
		</div>
	    </div>
	)
    }

}
