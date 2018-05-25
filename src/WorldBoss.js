import React, {Component} from 'react';
import './WorldBoss.css';

class WorldBoss extends Component {

	constructor(props) {
		super(props);
		this.state = {
			participants: [],
			approved: [],
			pending: [],
			count: 0
		}
	}

	componentDidMount() {
		this.setState({participants: this.props.participants})
  	}

  	onClickApproved = () => {
  		fetch(`${process.env.DOM}/viewapproved`)
  		.then(response => response.json())
  		.then(data => this.setState({
  			approved: data,
  			count: data.length
  		}))
  	}

  	onClickPending = () => {
  		fetch(`${process.env.DOM}/viewpending`)
  		.then(response => response.json())
  		.then(data => this.setState({pending: data}))
  	}

  	onClickRegister = () => {

  		this.props.onRouteChange('register');
  	}

  	onShowParticipants = () => {
  		fetch(`${process.env.DOM}/worldboss`)
        .then(response => response.json())
        .then(data => this.setState({participants: data}))
  	}

	render() {
		const {participants, approved, pending, count} = this.state;
		const participantsArray = participants.map((player, index) => {
			return (
				<div>
					<input key={index} type="checkbox" name="player" value="ign"/>{participants[index].ign}
				</div>
			)
		})

		const approvedArray = approved.map((player, index) => {
			return (
				<div>
					{approved[index].ign}
				</div>
			)
		})

		const pendingArray = pending.map((player, index) => {
			return (
				<div>
					{pending[index].ign}
				</div>
			)
		})
		return (
			<div>
				<div style={{marginTop: '10px'}}>
					<strong>{this.props.note}</strong>
				</div>
				<div style={{marginTop: '30px'}}>
					<button onClick={this.onClickApproved} type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">
					  Approved Claimants
					</button>
				</div>

				<div style={{marginTop: '20px'}}>
					<button onClick={this.onClickPending} type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModa2">
					  Pending Claimants
					</button>
				</div>

				<div style={{marginTop: '20px'}}>
					<button onClick={this.onClickRegister} type="button" class="btn btn-dark">
					  Back
					</button>
				</div>

				<div style={{marginTop: '20px'}}>
					<button onClick={this.onShowParticipants} type="button" class="btn btn-warning">
					  Show Participants
					</button>
				</div>

				<div style={{marginTop: '20px'}}>
					<h2>World/Guild Boss Participants</h2>
					{participantsArray}
				</div>

				

				<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Players who already claimed their auction prizes [{count} players]</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
				        {approvedArray}
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				      </div>
				    </div>
				  </div>
				</div>

				<div class="modal fade" id="exampleModa2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Players who are pending to claim their auction prizes</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
				    	{pendingArray}
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				      </div>
				    </div>
				  </div>
				</div>
			
			</div>
		)
	}
}

export default WorldBoss;