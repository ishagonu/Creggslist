import React from "react";
import { Button, Navbar, NavDropdown, Form, FormControl } from 'react-bootstrap';
import {Route, Link, Switch, useRouteMatch} from 'react-router-dom';
import ReactModal from 'react-modal';
import Make_Post from './make-post.js';
import Item_Info from './item-info.js';
import placeholder from './assets/placeholder.png';
import banana from './assets/bananas.jpg';
import bicycle from './assets/bicycle.png';
import './home.css';
import postsApi from "./postsApi.js";

const examplePosts = [{
	photo: banana,
	title: 'Bananas',
	content: 'These bananas are so delicious, please buy them.',
	location: '94582',
	price: 5.50,
	keywords: 'banana, yellow, fruit', /* sb array of strings */
	author_email: 'hubert@creggslist.com'
}, {
	photo: bicycle,
	title: 'Bicycle',
	content: 'This bicycle is so fast.',
	location: '95014',
	price: 50.50,
	keywords: 'bicycle, pony, fast',
	author_email: 'hubert@creggslist.com'
}, {
	photo: placeholder,
	title: 'Placeholder',
	content: 'Nothing to see here.',
	location: '00000',
	price: 0.00,
	keywords: '',
	author_email: 'null@null.com'
}];

export default class Home extends React.Component {
	constructor() {
		super()
		this.state = {
			showModal: false, //show pop-up w/ more detailed info
			itemID: 0,
			homePosts: [],
			searchCategory: null,
			searchInput: "",
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
		postsApi.searchPosts(searchInput, searchCategory === "location" ? searchCategory : null )
			.then((result) => (
				console.log("search posts " + result.postList)
				//this.setState({ homePosts: foundPosts })
			)).catch((err) => {
				console.log(`Oh no! Search posts ${err}`);
				this.setState({ error: err });
			});
		
		this.setState({ homePosts: examplePosts });
	}

	//Get 50 most recent posts + stores in state to rerender w/o search filters
	clearSearch() {
		console.log("clear search");
		postsApi.searchPosts("", null) // 1st param is search query, 2nd is location (zipcode)
		.then((result) => (
			this.setState({ homePosts: result.postList })
		)).catch((err) => {
			console.log(`Oh no! Clear search ${err}`);
			this.setState({ error: err });
		});

		this.setState({ searchInput: "", searchCategory: null });
		this.setState({homePosts: []}); //remove later!!
	}

	//When home screen mounts, get information for all posts to display
	componentDidMount() {
		postsApi.searchPosts(" b", null) // 1st param is search query, 2nd is location (zipcode)
			.then((result) => (
				this.setState({ homePosts: result.postList })
			)).catch((err) => {
				console.log(`Oh no! Component mount ${err}`);
				this.setState({ error: err });
			});

		//this.setState({ homePosts: examplePosts });
	}

	render() {
		const { homePosts, itemID, showModal } = this.state;

		return (
			<div>
				<p className='text'>This is Home</p>
				<p className='text'><Link to="/make-post" id="link">Make Post</Link></p>
				<div>
					<Navbar className="searchHeader" bg="light">
						<Navbar.Brand> Find posts </Navbar.Brand>
						<NavDropdown title="Select by">
							<NavDropdown.Item onClick={() => this.setState({ searchCategory: "keywords" })}>
								Keywords (default)
						</NavDropdown.Item>
							<NavDropdown.Item onClick={() => this.setState({ searchCategory: "title" })}>
								Title
						</NavDropdown.Item>
							<NavDropdown.Item onClick={() => this.setState({ searchCategory: "location" })}>
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
				{homePosts.length === 0 && <h1 className="text"> No posts yet :( </h1>}
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
