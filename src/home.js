import React from "react";
import {Route, Link, Switch} from 'react-router-dom';
import ReactModal from 'react-modal';

import Make_Post from './make-post.js';
import Item_Info from './item-info.js';

import Button from 'react-bootstrap/Button';
import './home.css';

import placeholder from './assets/placeholder.png';
import banana from './assets/bananas.jpg';
import bicycle from './assets/bicycle.png';
export default class Home extends React.Component{
    constructor(){
	super()
	this.state ={
	    showModal: false,
	    item_id: 0
	}
	this.handleOpenItemInfo = this.handleOpenItemInfo.bind(this);
	this.handleCloseItemInfo = this.handleCloseItemInfo.bind(this);
    }
    
    handleOpenItemInfo(event){
	this.setState({item_id: event.target.id});
	this.setState({showModal: true});
    }
    handleCloseItemInfo(){
	this.setState({showModal: false});
	this.setState({item_id: 0});
    }
    
	render(){
	    const examplePosts=[ {
		img_link: banana,
		name: 'Bananas',
		descript: 'These bananas are so delicious, please buy them.',
		zip: '94582',
		price: 5.50,
		keywords: 'banana, yellow, fruit',
		email: 'hubert@creggslist.com'
	    }, {
		img_link: bicycle,
		name: 'Bicycle',
		descript: 'This bicycle is so fast.',
		zip: '95014',
		price: 50.50,
		keywords: 'bicycle, pony, fast',
		email: 'hubert@creggslist.com'
	    },{
		img_link: placeholder,
		name: 'Placeholder',
		descript: 'Nothing to see here.',
		zip: '00000',
		price: 0.00,
		keywords: '',
		email: 'null@null.com'

	    }];

	
        return(
	    <div>
		<p className='text'>This is Home</p>
		<p className='text'><Link to="/make-post" id="link">Make Post</Link></p>
		{examplePosts.map((post, index) => {
		    return (
			<div className='item-list'>			  
			    <button onClick={this.handleOpenItemInfo} id={index}><img src={post.img_link} id={index} alt='error'/></button> 
			</div>

		    )
		})}
	
		<ReactModal isOpen={this.state.showModal} >
				<Button onClick={this.handleCloseItemInfo}> Close </Button>
				<Item_Info
				    img_link={examplePosts[this.state.item_id].img_link}
				    name={examplePosts[this.state.item_id].name}
				    descript={examplePosts[this.state.item_id].descript}
				    zip={examplePosts[this.state.item_id].zip}
				    price={examplePosts[this.state.item_id].price}
				    keywords={examplePosts[this.state.item_id].keywords}
				    email={examplePosts[this.state.item_id].email}
				/>

			    </ReactModal>

		
		<Switch>
		    <Route path = '/make-post' component={Make_Post}/>
		</Switch>
		</div>
        );
    }
}
