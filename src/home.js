import React from "react";
import { Button, Navbar, NavDropdown, Form, FormControl, Row } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import ReactModal from 'react-modal';
import { BsPeopleCircle } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

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
			showModal: false, //show pop-up w/ more detailed info
			itemID: 0,
			homePosts: [],
			searchCategory: "Select by",
			searchInput: "",
			gotoProfile: false,
			gotoPost: false,
		}
		this.openItemInfo = this.openItemInfo.bind(this);
		this.closeItemInfo = this.closeItemInfo.bind(this);
		this.searchForPosts = this.searchForPosts.bind(this);
		this.clearSearch = this.clearSearch.bind(this);
	}

	//After user clicks on photo, open the modal w/ more detailed info
	openItemInfo(event) {
		this.setState({ itemID: event.target.id });
		this.setState({ showModal: true });
	}
	//After user clicks close on modal, close modal to return to regular home view
	closeItemInfo() {
		this.setState({ showModal: false });
		this.setState({ itemID: 0 });
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

		this.setState({ searchInput: "", searchCategory: "Select by" });
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

	render() {
		const { homePosts, itemID, showModal, viewerEmail, gotoProfile, gotoPost } = this.state;

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
					<Row className="homeHeader">
						<h2 className='text'>This is Home</h2>
						{/* Buttons to navigate to profile or make post */}
						<Button variant="light" className="profileButton" onClick={() => this.setState({ gotoProfile: !gotoProfile })}>
							<BsPeopleCircle className="profileIcon" />
				    		Profile
						</Button>
						<Button variant='light' className='profileButton' onClick={() => this.setState({ gotoPost: !gotoPost })}><AiFillEdit /> Make Post</Button>
					</Row>
				</div>

				<div>
					{ /* Navbar, form, buttons to represent the search bar */ }
					<Navbar className="searchHeader" bg="light">
						<Navbar.Brand> Find posts </Navbar.Brand>
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
						<Form inline>
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
							>
								Search
								</Button>
							<Button
								variant="outline-primary"
								onClick={this.clearSearch}
							>
								Clear search
								</Button>
						</Form>
					</Navbar>
				</div>
				{homePosts.length === 0 && <h1 className="text"> No posts :( </h1>}
				{homePosts.map((post, index) => { //Map each post's info to an image display
					return (
						<div className='item-list'>
							<button onClick={this.openItemInfo} id={index}>
								<img src={post.photo} id={index} alt='error' />
							</button>
						</div>
					)
				})}

				{showModal &&
					<ReactModal isOpen={showModal} /* When the post image is clicked, pop-up opens up w/ item info */>
						<Button onClick={this.closeItemInfo}> Close </Button>
						<Item_Info
							img_link={homePosts[itemID].photo ? homePosts[itemID].photo : "No photo"}
							name={homePosts[itemID].title}
							descript={homePosts[itemID].content}
							zip={homePosts[itemID].location}
							price={homePosts[itemID].price}
							keywords={homePosts[itemID].keywords}
							email={homePosts[itemID].author_email}
						/>
					</ReactModal>
				}

				<Switch>
					<Route path='/make-post' component={Make_Post} />
				</Switch>
			</div>
		);
	}
}
