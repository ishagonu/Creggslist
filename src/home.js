import React from "react";
import { Button, Navbar, NavDropdown, Form, FormControl, Row } from 'react-bootstrap';
import { Route, Link, Switch } from 'react-router-dom';
import ReactModal from 'react-modal';
import { BsPeopleCircle } from "react-icons/bs";

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
		}
		this.openItemInfo = this.openItemInfo.bind(this);
		this.closeItemInfo = this.closeItemInfo.bind(this);
		this.searchForPosts = this.searchForPosts.bind(this);
		this.clearSearch = this.clearSearch.bind(this);
	}

	openItemInfo(event) {
		this.setState({ itemID: event.target.id });
		this.setState({ showModal: true });
	}
	closeItemInfo() {
		this.setState({ showModal: false });
		this.setState({ itemID: 0 });
	}

	//Searches for posts if user uses nav bar, gets new information + stores it in state to rerender
	searchForPosts() {
		const { searchInput, searchCategory } = this.state;
		console.log("search post");
		postsApi.searchPosts(searchInput, searchCategory === "Location" ? searchCategory : null)
			.then((result) => (
				//console.log("search posts " + result.postList)
				this.setState({ homePosts: result.postList })
			)).catch((err) => {
				console.log(`Oh no! Search posts ${err}`);
				this.setState({ error: err });
			});

		//this.setState({ homePosts: examplePosts });
	}

	//Get 50 most recent posts + stores in state to rerender w/o search filters
	clearSearch() {
		postsApi.getAllPosts()
			.then((result) => (
				//console.log("clear search and get all posts" + result.postList)
				this.setState({ homePosts: result.postList === null ? [] : result.postList })
			)).catch((err) => {
				console.log(`Oh no! Clear search ${err}`);
				this.setState({ error: err });
			});

		this.setState({ searchInput: "", searchCategory: "Select by" });
	}

	//When home screen mounts, get information for all posts to display
	componentDidMount() {
		//console.log("get all posts");
		postsApi.getAllPosts()
			.then((result) => (
				//console.log("get all posts" + result.postList)
				this.setState({ homePosts: result.postList === null ? [] : result.postList })
			)).catch((err) => {
				console.log(`Oh no! Component mount ${err}`);
				this.setState({ error: err });
			});

		this.setState({ 
			viewerEmail: this.props.email, 
			gotoProfile: false 
		});
		//this.setState({ homePosts: examplePosts });
	}

	render() {
		const { homePosts, itemID, showModal, viewerEmail, gotoProfile } = this.state;
		console.log("home email in render = " + viewerEmail);

		if (gotoProfile === true) { //If user clicks home button, this will redirect to home screen
            return (
                <div>
                    <Switch>
                        <Route><Profile viewerEmail={viewerEmail} profileEmail={viewerEmail}/></Route>
                    </Switch>
                </div>
            );
        }

		return (
			<div>
				<div>
					<Row className="homeHeader">
						<h2 className='text'>This is Home</h2>
						<Button variant="light" className="profileButton" onClick={() => this.setState({gotoProfile: !gotoProfile})}>
							<BsPeopleCircle className="profileIcon"/>
							Profile
						</Button>
					</Row>
				</div>
				<p className='text'><Link to="/make-post" id="link">Make Post</Link></p>
				<div>
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
				{homePosts.map((post, index) => {
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