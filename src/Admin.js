import React, {Component} from 'react';

class Admin extends Component {
	constructor(props){
		super(props)
		this.state = {
			username: '',
			password: '',
			inputuser: '',
			inputpass: ''
		}
	}


  	onUsernameChange = (event) => {
  		this.setState({inputuser: event.target.value})
  	}


  	onPasswordChange = (event) => {
  		this.setState({inputpass: event.target.value})
  	}


  	onLogin = () => {
  		fetch(`${process.env.DOM}/admin`, {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username: this.state.inputuser,
				password: this.state.inputpass
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.onRouteChange('adminpanel');
			}
		})
  	}

  	onBack = () => {
		this.props.onRouteChange('register')
  	}





	render() {
		return (
			<div style={{marginTop: '40px'}}>
				<input onChange={this.onUsernameChange} type="text" class="form-control" id="inputPassword" placeholder="Enter admin user"/>
				<input onChange={this.onPasswordChange} type="password" class="form-control" id="inputPassword" placeholder="Enter password"/>
				<button
					style={{marginRight: '15px'}}
					onClick={this.onLogin}
					type="button" 
					class="btn btn-success">Log In
				</button>

				<button
					onClick={this.onBack}
					type="button" 
					class="btn btn-dark">Back
				</button>
			</div>
		);
	}
}

export default Admin;
