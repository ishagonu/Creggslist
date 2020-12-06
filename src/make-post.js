// Libraries
import React from 'react';
import ImageUploading from "react-images-uploading";
import {Route, Link, Switch} from 'react-router-dom';
import ReactModal from 'react-modal';

// Directories
import Home from './home.js'
import Item_Info from './item-info.js';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// CSS
import './make-post.css';

// API
import PostsApi from './postsapi.js';

// Placeholder Image
import placeholder_img from './assets/placeholder.png'


export default function Make_Post(){
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
	console.log(imageList, addUpdateIndex);
	setImages(imageList);
    };

    const [item_title, setItemTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [price, setPrice] = React.useState(null);
    const [keywords, setKeywords] = React.useState('');
    
    const [showItemPreview, setItemPreview] = React.useState(false);
   
    
    function imagePicked(){
	return images.length > 0;
    }

    function uploadHelp(){
	alert('Upload an image of your item so we know what it looks like!')
    }
    function validateForm(){
	return images.length > 0 && item_title.length > 0 && description.length > 0 && zip.length > 0 && price.length > 0 && keywords.length > 0;
    }
    function validInputs(){
	var errorMessage = [];

	// zip code must be a number with 5 digits
	if (zip.length !== 5 || isNaN(Number(zip))){
	    errorMessage.push('Enter a valid Zip Code (5 digit number)');
	}

	// price must be a number
	if (isNaN(parseFloat(price))){
	    errorMessage.push('Please enter a valid price');
	}

	if (errorMessage.length > 0){
	    alert('Please fix the following issues : \n'+  errorMessage.join('\n'));
	    errorMessage= [];
	    return false;
	}else{
	    return true;
	}
	
	
    }

    function handleOpenItemInfo(){
	if (!validInputs()){return}
	setItemPreview(true); 
    }

    function handleCloseItemInfo(){
	setItemPreview(false);
    }
    function showPreview(){
	return showItemPreview;
    }

    function makePost(){
	if (!validInputs()){return}
	const keys = keywords.split(',');
	const email = 'junho.choix10@gmail.com';
	const image_link = 'https://api.time.com/wp-content/uploads/2019/11/gettyimages-459761948.jpg?w=800&quality=85';
	PostsApi.createPost(email, keys, image_link, zip, description, parseFloat(price), item_title);
    }
    return (
	
	<div className='item_detail-container'>
	    <ImageUploading
		multiple
		value={images}
		onChange={onChange}
		maxNumber={maxNumber}
		dataURLKey='data_url'
	    >
		{({
		    imageList,
		    onImageUpload,
		    onImageRemoveAll,
		    onImageUpdate,
		    onImageRemove,
		    isDragging,
		    dragProps
		}) => (
		    <div className='upload__image-wrapper'>
			<div style={imagePicked() ? {display:'none'} : null} class='placeholder'>
			    <div class='placeholder-img'><img src={placeholder_img} width='100' height='345'/></div>
			    <Button
				style={isDragging ? { color : 'red'} : null, imagePicked() ? {display:'none'} : null}
				onClick={onImageUpload}
				size='lg'
				{...dragProps}
			    >
				Click or Drop here
			    </Button>
			    <Button onClick={()=>uploadHelp()} size='lg' variant='light'>?</Button>
			</div>
			
			&nbsp;
			{imageList.map((image, index) =>(
			    <div key={index} className='image-item'>
				<img src={image.data_url} alt='error'/>
				<div className='image-item__btn-wrapper'>
				    <Button size='lg' onClick={() => onImageUpdate(index)}>Update</Button>
				    <Button size='lg' variant='light' onClick={() => onImageRemove(index)}>Remove</Button>
				</div>
			    </div>			    
			))}
			
		    </div>
		)}
	    </ImageUploading>
	    <br/>
	    
	    <div className='description-wrapper'>
		<div className='form-group'>
		    <form>
			<input className='form-control' type='text' id='item_title' placeholder='Title of Your Post*'
			       value={item_title}
			       onChange={(e) => setItemTitle(e.target.value)}
			/>
			<textarea class='form-control' id='description' rows='9' placeholder='Description*'
				  value={description}
				  onChange={(e) => setDescription(e.target.value)}
			/>
			
			<div className='input-group'>
			    <div class='input-group-prepend'>
				<div class='input-group-text'>$</div>
			    </div>
			    <input type='text' id='price' class='form-control' placeholder= 'Price*'
				   value={price}
				   onChange={(e) => setPrice(e.target.value)}
			    />
			    <input type='text' id='zip' class='form-control' placeholder='ZIP Code*'
				   value={zip}
				   onChange={(e) => setZip(e.target.value)}
			    />
			</div>
			
			<div className='input-group'>
			    <input type='text' id = 'keywords' class='form-control' placeholder='Keywords* (book, bicycle, television, etc.)'
				   value={keywords}
				   onChange={(e) => setKeywords(e.target.value)}
			    />
			</div>
			<Button size='lg' class='btn' style={{width: '50%'}} disabled={!validateForm()} onClick={() => makePost()}> Post </Button>
			<Button size='lg' class='btn' variant='light' style={{width: '50%'}} disabled={!validateForm()} onClick={() => handleOpenItemInfo()}> Preview </Button>
		    </form>
		    <ReactModal isOpen={showPreview()}>
			<Button onClick={()=>setItemPreview(false)}> Close </Button>
			<br/>
			<Item_Info
			    img_link={images.length > 0 ? images[0].data_url : null} alt='error' width='250'
			    name={item_title}
			    descript={description}
			    zip={zip}
			    price={price}
			    keywords={keywords}
			    email='email'
			/>
		    </ReactModal>
		

	    </div>
	</div>
	
	</div>	    

    );
}
