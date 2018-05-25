import React, {Component} from 'react';

class AdminPanel extends Component {

	constructor (props) {
		super(props)
		this.state = {
			ignapproved: '',
			ignpending: ''
		}
	}


	onGenerateCode = () => {
		var random = Math.floor(Math.random() * Math.pow(10, 4))
		fetch(`${process.env.DOM}/generatecode`, {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					code: random
				})
		})
		.then(response => response.json())
		.then(data => this.props.onCodeChange(data.code))
	}

	randomize = () => {
		fetch(`${process.env.DOM}/randomize`)
	      .then(response => response.json())
	      .then(data => this.props.onRandomize(data))
	}

	onBack = () => {
		this.props.onRouteChange('register')
	}

	onClickApproved = () => {
		fetch(`${process.env.DOM}/insertapproved`, {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					ign: this.state.ignapproved
				})
		})
		.then(response => response.json())
		.then(data => console.log(data))
	}

	onClickPending = () => {
		fetch(`${process.env.DOM}/insertpending`, {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					ign: this.state.ignpending
				})
		})
		.then(response => response.json())
		.then(data => console.log(data))
	}

	onClearParticipants = () => {
		fetch(`${process.env.DOM}/clearparticipants`)
	      .then(response => response.json())
	      .then(data => console.log(data))
	}

	onClearApproved = () => {
		fetch(`${process.env.DOM}/clearapproved`)
	      .then(response => response.json())
	      .then(data => console.log(data))
	}

	onClearPending = () => {
		fetch(`${process.env.DOM}/clearpending`)
	      .then(response => response.json())
	      .then(data => console.log(data))
	}


	onIgnApprovedChange = (event) => {
		this.setState({ignapproved: event.target.value})
	}

	onIgnPendingChange = (event) => {
		this.setState({ignpending: event.target.value})
	}

	render() {
		return (
			<div style={{marginTop: '40px'}}>
				<button
					onClick={this.onGenerateCode}
					type="button" 
					class="btn btn-success">Generate Code
				</button>

				<button
					style={{marginLeft: '15px'}}
					onClick={this.onBack}
					type="button" 
					class="btn btn-dark">Back
				</button>

				<h1>CODE: {this.props.code}</h1>


				<div style={{marginTop: '35px'}}>
					<input onChange={this.onIgnApprovedChange} type="text" class="form-control" id="inputPassword" placeholder="Enter player ign"/>
					<button
						onClick={this.onClickApproved}
						type="button" 
						class="btn btn-success">Insert to Approved
					</button>
				</div>

				<div style={{marginTop: '30px'}}>
					<input onChange={this.onIgnPendingChange} type="text" class="form-control" id="inputPassword" placeholder="Enter player ign"/>
					<button
						onClick={this.onClickPending}
						type="button" 
						class="btn btn-warning">Insert to Pending
					</button>
				</div>

				<div style={{marginTop: '40px'}}>
					<div style={{marginTop: '20px'}}>	
						<button
							onClick={this.randomize}
							type="button" 
							class="btn btn-danger">Randomize Participants
						</button>
					</div>

					<div style={{marginTop: '15px'}}>
						<button
							data-toggle="modal" data-target="#clearparticipants"
							
							type="button" 
							class="btn btn-dark">Clear Participants
						</button>
					</div>

					<div style={{marginTop: '15px'}}>
						<button
							data-toggle="modal" data-target="#clearapproved"
							type="button" 
							class="btn btn-dark">Clear Approved
						</button>
					</div>

					<div style={{marginTop: '15px'}}>
						<button
							data-toggle="modal" data-target="#clearpending"
							type="button" 
							class="btn btn-dark">Clear Pending
						</button>
					</div>
				</div>

				<div class="modal fade" id="clearparticipants" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLongTitle">Clear Participants?</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-footer">
				      	<button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.onClearParticipants}>Yes</button>
				        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
				      </div>
				    </div>
				  </div>
				</div>

				<div class="modal fade" id="clearapproved" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLongTitle">Clear Approved?</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-footer">
				      	<button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.onClearApproved}>Yes</button>
				        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
				      </div>
				    </div>
				  </div>
				</div>

				<div class="modal fade" id="clearpending" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLongTitle">Clear Pending?</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-footer">
				      	<button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.onClearPending}>Yes</button>
				        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
				      </div>
				    </div>
				  </div>
				</div>

			</div>
		)
	}
}

export default AdminPanel;