import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './Register';
import WorldBoss from './WorldBoss';
import Admin from './Admin';
import AdminPanel from './AdminPanel';

class App extends Component {

  constructor(){
    super();
    this.state = {
      route: 'register',
      participants: [],
      code: NaN,
      note: ''
    }
  }

  componentDidMount() {
      fetch(`${process.env.DOM}/latestcode`)
        .then(response => response.json())
        .then(data => this.setState({code:data[0].code}))

 
  }

  onSetParticipants = (data) => {
    this.setState({participants: data})
  }

  onRouteChange = (route) => {
    this.setState({route: route})
  }

  onCodeChange = (code) => {
    this.setState({code : code})
  }

  onRandomize = (data) => {
    this.setState({participants: data})
  }

  onChangeNote = (data) => {
    this.setState({note: data})
  }

  render() {
    const {route, code, participants, note} = this.state;
    return (
      <div className="App">
        {route === 'register'
          ? <Register onChangeNote={this.onChangeNote} onSetParticipants={this.onSetParticipants} onRouteChange={this.onRouteChange} code={code}/>
          : (
              route === 'admin'
                ? <Admin onRouteChange={this.onRouteChange}/>
                : (
                    route === 'adminpanel'
                    ? <AdminPanel onRandomize={this.onRandomize} code={code} onCodeChange={this.onCodeChange} onRouteChange={this.onRouteChange}/>
                    : <WorldBoss onSetParticipants={this.onSetParticipants} note={note} participants={participants} onRouteChange={this.onRouteChange}/>
                  )
            )
        }
      </div>
    );
  }
}

export default App;
