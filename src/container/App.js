
import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
		.then(users=>this.setState({robots:users}));
		
	}

	onSearchChange = (event) => {

		this.setState({ searchfield: event.target.value})
	}
 
	render() {
		const filteredRobots = this.state.robots.filter(robot =>{
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
		if(!this.state.robots.length){
			return <h1>Loading</h1>
		}
		else {
			return(
			<div className = 'tc'>
				<h1 className = 'f1'> RoboFriends </h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>	
					<CardList robots = {filteredRobots}/>
				</Scroll>
			</div>	
			);
			}
	}
}

export default App;

// why we put arrow after onsearchchange event
// this is a trick that you always forget, but just keep this in mind as a rule of thumb
// With anything that comes from React, so constructor and render are pre-built in React, any time you
// make your own methods on a component, use this syntax, so arrow functions, and this makes sure that the "this"
// value is according to where it was created, which is the "App"