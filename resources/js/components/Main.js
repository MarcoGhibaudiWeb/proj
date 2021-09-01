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
      propertyIds: [],
    }
    this.handleAddJob = this.handleAddJob.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

  }
  /*componentDidMount() is a lifecycle method
   * that gets called after the component is rendered
   */
  componentDidMount() {
    /* fetch API in action */
    fetch('/api/jobs')
      .then(response => {
        return response.json();
      })
      .then(jobs => {
        //Fetched job is stored in the state
        this.setState({ jobs });
        this.fetchPropertyIds(jobs);
      });
    fetch('/api/properties')
      .then(response => {
        return response.json();
      })
      .then(properties => {
        //Fetched job is stored in the state
        this.setState({ properties });
      });
  }

  fetchPropertyIds(jobs){
    const propertyIds = [];
        this.state.jobs.map(job =>{
          propertyIds.push(job.id);
        })
        this.setState({propertyIds})
  }

  handleAddJob(job) {
    /*Fetch API for post request */
    fetch( 'api/jobs/', {
        method:'post',
        /* headers are important*/
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
         
        body: JSON.stringify(job)
    })
    .then(response => {

        return response.json();
    })
    fetch('/api/jobs')
      .then(response => {
        return response.json();
      })
      .then(jobs => {
        //Fetched job is stored in the state
        this.setState({ jobs });
      });
  
  }

  handleDelete(id) {

    fetch('api/jobs/' + id,
      { method: 'delete' });

        fetch('/api/jobs')
        .then(response => {

          return response.json();
        })
        .then(jobs => {
          //Fetched job is stored in the state
          this.setState({ jobs });
        });
     
  }
  
  handleUpdate(job, id) {

    fetch( 'api/jobs/' + id, {
        method:'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
    })
    .then(response => {
        return response.json();
    })
      fetch('/api/jobs')
      .then(response => {
        return response.json();
      })
      .then(jobs => {
        //Fetched job is stored in the state
        this.setState({ jobs });
      });
     
   


  }

  

  render() {
    const mystyle = {
      padding: "10px",
width:"80%",
margin: "0 auto"
    };

    return (

      
      /* The extra divs are for the css styles */
      <div style={mystyle}>
        
        <TableMaker onUpdate = {this.handleUpdate} onDelete = {this.handleDelete} jobs={this.state.jobs} properties={this.state.properties}/>
        <AddJob onAdd={this.handleAddJob} properties={this.state.properties} />
      </div>
    );
  }
}

export default Main;

if (document.getElementById('root')) {
  ReactDOM.render(<Main />, document.getElementById('root'));
}

