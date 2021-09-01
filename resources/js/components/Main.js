import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddJob from './AddJob';
import TableMaker from './TableMaker';

/* Main Component */
class Main extends Component {

  constructor() {

    super();
    //Initialize the state in the constructor
    this.state = {
      jobs: [],
      properties: [],
      response: [],
    }
    this.handleAddJob = this.handleAddJob.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

  }

  componentDidMount() {
    /* fetch API in action */
    fetch('/api/jobs')
      .then(response => {
        return response.json();       
      })
      .then(jobs => {
        //Fetched job is stored in the state
        this.setState({ jobs });
      });
    fetch('/api/properties')
      .then(response => {
        return response.json();
      })
      .then(properties => {
        this.setState({ properties });
      });
  }

  handleAddJob(job) {
    /*Fetch API for post request */
    fetch('api/jobs/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(job)
    })
      .then(response => {
        this.setState({ response });
        return response.json();
      })
    //Refresh jobs list in the state
    fetch('/api/jobs')
      .then(response => {
        return response.json();
      })
      .then(jobs => {
        this.setState({ jobs });
      });

  }

  handleDelete(id) {

    fetch('api/jobs/' + id,
      { method: 'delete' });
    //Refresh jobs list in the state
    fetch('/api/jobs')
      .then(response => {
        this.setState({ response });
        return response.json();
      })
      .then(jobs => {
        this.setState({ jobs });
      });

  }

  handleUpdate(job, id) {

    fetch('api/jobs/' + id, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    })
      .then(response => {
        this.setState({ response });
        return response.json();
      })
    //Refresh jobs list in the state
    fetch('/api/jobs')
      .then(response => {
        return response.json();
      })
      .then(jobs => {
        this.setState({ jobs });
      });
  }

  render() {
    const mystyle = {
      padding: "10px",
      width: "80%",
      margin: "0 auto"
    };

    return (
      <div style={mystyle}>
        <h3>Jobs List</h3>
        <TableMaker onUpdate={this.handleUpdate} onDelete={this.handleDelete} jobs={this.state.jobs} response = {this.state.response} properties={this.state.properties} />
        <h3 style={{margin: "0 0 2rem 0"}}>Add a new Job</h3>
        <AddJob onAdd={this.handleAddJob} properties={this.state.properties} response = {this.state.response} />
      </div>
    );
  }
}

export default Main;

if (document.getElementById('root')) {
  ReactDOM.render(<Main />, document.getElementById('root'));
}

