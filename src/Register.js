import React, {Component} from 'react';
import './Register.css';

class Register extends Component {

	constructor(props) {
		super(props)
		this.state = {
			inputcode: NaN,
			ign: ''
		}
	}

	onCodeChange = (event) => {
		this.setState({inputcode: Number(event.target.value)})
	}

	onNameChange = (event) => {
		this.setState({ign: event.target.value})
	}

	onSubmit = () => {
		if (this.state.inputcode === this.props.code){
			fetch(`${process.env.DOM}/register`, {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					ign: this.state.ign
				})
			})
			.then(response => response.json())
			.then(player => {
				if(player.id){
					this.props.onRouteChange('worldboss')
					this.props.onChangeNote(`Registered successfully! Click 'Show Participants' to update the list.`)
				}
			})
		}
		this.onSetParticipants();
	}


	onSetParticipants = () => {
		fetch(`${process.env.DOM}/worldboss`)
        .then(response => response.json())
        .then(data => this.props.onSetParticipants(data))
	}


	onLoginGuest = () => {
		this.onSetParticipants();
        this.props.onChangeNote(`Click 'Show Participants' to update the list`)
		this.props.onRouteChange('worldboss')

	}

	render() {
		return (
			<div>
				<h1 style={{marginTop: '100px'}}>Welcome to Anti!</h1>
				<input onChange={this.onCodeChange} type="text" class="form-control" id="inputPassword" placeholder="Enter code given by Python"/>
				<input onChange={this.onNameChange} type="text" class="form-control" id="inputPassword" placeholder="Enter your IGN"/>
				<button
					onClick={this.onSubmit}
					type="button" 
					class="btn btn-dark">Register to World/Guild Boss
				</button>

				<div style={{marginTop: '10px'}}>
					<button
						onClick={this.onLoginGuest}
						type="button" 
						class="btn btn-success">View Results

					</button>
				</div>

				<small><strong><span onClick={ () => this.props.onRouteChange('admin')} style={{cursor: 'pointer'}}>Log in as admin here.</span></strong></small>

			</div>
		)
	}
}

export default Register;