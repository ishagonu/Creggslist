import React from "react";
import { Button, Navbar, NavDropdown, Form, FormControl, Row } from 'react-bootstrap';

import { Route, Switch } from 'react-router-dom';
import Modal from 'react-modal';

import { BsPeopleCircle } from "react-icons/bs";
import { AiFillEdit, AiOutlineClose, AiOutlineSearch} from "react-icons/ai";

import Make_Post from './make-post.js';
import Item_Info from './item-info.js';
import postsApi from "./postsApi.js";
import './home.css';
import Profile from "./profile.js";

export default class Home extends React.Component {
    constructor() {
	super()
	this.state = {
	    viewerEmail: null, //get current user's email from props in componentdidmount
	    showItemModal: false, //show pop-up w/ more detailed info
	    itemID: 0,
	    homePosts: [],
	    searchCategory: "Search by",
	    searchInput: "",
	    gotoProfile: false,
	    gotoPost:false,

	    modalSetting : [
		 '20%',
		 '15%',
		 '10%',
		'25%'
	    ]
	}
	

	this.openItemInfo = this.openItemInfo.bind(this);
	this.closeItemInfo = this.closeItemInfo.bind(this);
	this.searchForPosts = this.searchForPosts.bind(this);
	this.clearSearch = this.clearSearch.bind(this);
	this.setModalSetting = this.setModalSetting.bind(this);
    }


	//Searches for posts if user uses nav bar, gets new information + stores it in state to rerender
	searchForPosts() {
		const { searchInput } = this.state;
		console.log("search post");
		postsApi.searchPosts(searchInput)
			.then((result) => (
				this.setState({ homePosts: result.postList })
			)).catch((err) => {
				console.log(`Oh no! Search posts ${err}`);
				this.setState({ error: err });
			});

	}

	//Get 50 most recent posts + stores in state to rerender w/o search filters
	clearSearch() {
		postsApi.getAllPosts()
			.then((result) => (
				this.setState({ homePosts: result.postList === null ? [] : result.postList })
			)).catch((err) => {
				console.log(`Oh no! Clear search ${err}`);
				this.setState({ error: err });
			});

		this.setState({ searchInput: "", searchCategory: "Search by" });
	}

	//When home screen mounts, get information for all posts to display
	componentDidMount() {
		postsApi.getAllPosts()
			.then((result) => (
				this.setState({ homePosts: result.postList === null ? [] : result.postList })
			)).catch((err) => {
				console.log(`Oh no! Component mount ${err}`);
				this.setState({ error: err });
			});

		this.setState({
			viewerEmail: this.props.email,
			gotoProfile: false
		});
	}
   

    openItemInfo(event) {
	this.setState({ itemID: event.target.id });
	this.setState({ showItemModal: true });
    }
    closeItemInfo() {
	this.setState({ showItemModal: false });
	this.setState({ itemID: 0 });
	this.setModalSetting();
	this.clearSearch()
    }
    setModalSetting(view='item-view'){ // Set modal to different sizes depending on the view, default is item-view
	switch(view){ 
	case('item-view'):
	    this.setState({
		modalSetting: ['20%', '15%', '10%', '25%']		
	    })
	    break
	case('profile-view'):
	    this.setState({
		modalSetting: ['2%', '2%', '5%', '5%']
	    })
	    break
	case('edit-view'):
	    this.setState({
		modalSetting: ['20%', '15%', '5%', '0%']
	    })
	    break
	default:
	      this.setState({
		modalSetting: ['20%', '15%', '10%', '25%']		
	      })
	}

    }

	render() {

	    const { homePosts, itemID, showItemModal, viewerEmail, gotoProfile, gotoPost, modalSetting} = this.state;
	    
	    const modalStyle = {
		content : {
		    backgroundColor: 'rgb(181, 194, 236)',
		    borderRadius: '30px',
		    left:this.state.modalSetting[0],
		    right:this.state.modalSetting[1],
		    top:this.state.modalSetting[2],
		    bottom:this.state.modalSetting[3]
		}

	    }

	    console.log("home email in render = " + viewerEmail);


		if (gotoProfile === true) { //If user clicks home button, this will redirect to home screen
			return (
				<div>
					<Switch>
						<Route><Profile viewerEmail={viewerEmail} profileEmail={viewerEmail} /></Route>
					</Switch>
				</div>
			);
		} else if (gotoPost === true) {
			return (
				<div>
					<Switch>
						<Route><Make_Post viewerEmail={viewerEmail} /> </Route>
					</Switch>
				</div>
			);
		}

		return (

		    <div>
			<div>
			    <h2 className='text'>Home</h2>			
			</div>
			
			<div >
			    <Navbar className="searchHeader">
				<NavDropdown title={this.state.searchCategory}>
				    <NavDropdown.Item onClick={() => this.setState({ searchCategory: "Keywords" })}>
					Keywords (default)
				    </NavDropdown.Item>
				    <NavDropdown.Item onClick={() => this.setState({ searchCategory: "Title" })}>
					Title
				    </NavDropdown.Item>
				    <NavDropdown.Item onClick={() => this.setState({ searchCategory: "Location" })}>
					Location (Zip code)
				    </NavDropdown.Item>
				</NavDropdown>
				<Form inline >
				    <FormControl
					type="text"
					placeholder="Search"
					className="mr-sm-2"
					//Stores user's search query in state
					onChange={(event) => this.setState({ searchInput: event.target.value })}
					onKeyDown={
						(e) => {
						  if (e.key === 'Enter') {
							e.preventDefault();
							this.searchForPosts();
						  }
						}
					  }
				    />
				    <Button
					variant="outline-primary"
					onClick={this.searchForPosts}
				    ><AiOutlineSearch/> Search
				    </Button>&nbsp;&nbsp;
				    <Button
					variant="outline-primary"
					onClick={this.clearSearch}
				    >
					Clear search
				    </Button>
				    <div style={{position: 'absolute', textAlign:'right', width: '50%', right:'0'}}>
					<button variant="light" className="profileButton btn btn-outline-info" onClick={() => this.setState({gotoProfile: !gotoProfile})}>
					    <BsPeopleCircle/> Profile
					</button>&nbsp;
					<button variant='light' className='profileButton btn btn-outline-info' onClick={() => this.setState({gotoPost: !gotoPost})}>
					    <AiFillEdit/> Make Post
					</button>
				    </div>
				</Form>
				
				
			    </Navbar>
			</div>
			{homePosts.length === 0 && <h1 className="text"> No posts :( </h1>}
			 <div className='item-list'>
				{homePosts.map((post, index) => {
				    return (
					<div className='item' style={homePosts.length === 1  ? {position:'absolute'} : {position:'relative'}}>
					    <button onClick={this.openItemInfo} id={index}>
						<img src={post.photo} id={index} alt='error'/>
					    </button>
					    <span class='item-caption'>{post.title} </span>
					</div>

					)
				})}
			     </div>

				{showItemModal &&
				 <Modal class='item-info-modal' isOpen={showItemModal} style={modalStyle}>
				     <button class='btn btn-outline-danger' onClick={this.closeItemInfo} style={{float:'right'}}><AiOutlineClose/></button>

				     <Item_Info
					 item_id = {homePosts[itemID].post_id}
					 img_link={homePosts[itemID].photo ? homePosts[itemID].photo : "No photo"}
					 name={homePosts[itemID].title}							
					 descript={homePosts[itemID].content}
					 zip={homePosts[itemID].location}
					 price={homePosts[itemID].price}
					 keywords={homePosts[itemID].keywords}

					 email={homePosts[itemID].author_email}
					 viewerEmail = {viewerEmail}

					 isEdited={homePosts[itemID].isUpdated}
					 closeItemInfo={this.closeItemInfo}
					 setModalSetting={this.setModalSetting}
					 from='home'
				     />
				 </Modal>
				}

				<Switch>
					<Route path='/make-post' component={Make_Post} />
				</Switch>
			</div>
		);
	}
}
