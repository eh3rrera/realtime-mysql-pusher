import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Table from './Table.js';

import Pusher from 'pusher-js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {rows: []};
    
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
    
  componentDidMount() {
    this.pusher = new Pusher('<PUSHER_APP_KEY>', {
	  cluster: '<PUSHER_APP_CLUSTER>',
      encrypted: true,
    });
    this.channel = this.pusher.subscribe('products');
	
    this.channel.bind('insert', this.insert);
    this.channel.bind('update', this.update);
    this.channel.bind('delete', this.delete);
  }

  insert(data) {
    this.setState(prevState => ({
      rows: [ data, ...prevState.rows ]
    }));
  }

  update(data) {
    this.setState(prevState => ({
      rows: prevState.rows.map(el => 
              el.id === data.id ? data : el
      )
    }));
  }

  delete(id) {
    this.setState(prevState => ({
      rows: prevState.rows.filter(el => el.id !== String(id))
    }));
  }
    
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Table rows={this.state.rows} />
      </div>
    );
  }
}

export default App;
