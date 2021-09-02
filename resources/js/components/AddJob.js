import React, { Component } from 'react';
import { Form, FormTextarea, FormGroup, FormInput } from "shards-react";
import Button from '@material-ui/core/Button';
import PropertySelector from './PropertySelector';

class AddJob extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newJob: {
        summary: '',
        description: '',
        status: 'open',
        property: '',
        fname: '',
        lname: ''
      },
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleInputProperty = this.handleInputProperty.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  handleInput(key, e) {
    var state = Object.assign({}, this.state.newJob);
    state[key] = e.target.value;
    this.validateInput(key, e.target.value) 
    this.setState({ newJob: state })

  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.errors["description"] && !this.state.errors["summary"] && !this.state.errors["first name"] && !this.state.errors["last name"] && !this.state.errors["property"]) {
      this.props.onAdd(this.state.newJob);
    }
    else {
      for (const key in this.state.newJob) {
        let value = this.state.newJob[key];
        this.validateInput(key, value);
      }
      alert('Please check any incorrect value')
    }

  }

  handleInputProperty(key, e) {
    var state = Object.assign({}, this.state.newJob);
    state[key] = e;
    this.validateInput(key, e) 
    this.setState({ newJob: state });
  }

  validateInput(key, value) {
    let errors = this.state.errors;
    switch (key) {
      case 'description':
        if (value.length > 500) {
          errors["description"] = "Max 500 char";
        } else if (value === null || value.match(/^ *$/) !== null) {
          errors["description"] = "Can't be empty";
        } else {
          errors["description"] = "";
        };
        break;
      case 'summary':
        if (value.length > 150) {
          errors["summary"] = "Max 150 char";
        } else if (value === null || value.match(/^ *$/) !== null) {
          errors["summary"] = "Can't be empty";
        } else { errors["summary"] = ""; }
        break;
      case 'fname':
        if (value.length > 20) {
          errors["first name"] = "Max 20 char";
        } else if (value === null || value.match(/^ *$/) !== null) {
          errors["first name"] = "Can't be empty";
        } else { errors["first name"] = ""; }
        break;
      case 'lname':
        if (value.length > 20) {
          errors["last name"] = "Max 20 char";
        } else if (value === null || value.match(/^ *$/) !== null) {
          errors["last name"] = "Can't be empty";
        } else { errors["last name"] = ""; }
        break;
      case 'property':
        if (value === null ) {
          errors["property"] = "Can't be empty";
        } else { errors["property"] = ""; }
        break;
      case 'status':
        if (value === null ) {
          errors["status"] = "Can't be empty";
        } else { errors["status"] = ""; }
        break;
    }
    this.setState({ errors: errors });
  }

  render() {

    const mystyle = {
      margin: "1rem 0" ,
    };
    const formstyle = {
      backgroundColor: "#f7f7f5" ,
      padding : "1rem"
    };

    return (

      <Form onSubmit={this.handleSubmit} style={formstyle} >
        <FormGroup style={mystyle}>
          <label >Summary</label>
          <FormTextarea placeholder="Max 250 char" onChange={(e) => this.handleInput('summary', e)} />
          <span style={{ color: "red" }}>{this.state.errors["summary"]}</span>
        </FormGroup>
        <FormGroup style={mystyle}>
          <label >Description</label>
          <FormTextarea placeholder="Max 500 char" onChange={(e) => this.handleInput('description', e)} />
          <span style={{ color: "red" }}>{this.state.errors["description"]}</span>
        </FormGroup>
        <FormGroup style={mystyle}>
          <label >First Name</label>
          <FormInput placeholder="Name" onChange={(e) => this.handleInput('fname', e)} />
          <span style={{ color: "red" }}>{this.state.errors["first name"]}</span>
        </FormGroup>
        <FormGroup style={mystyle}>
          <label >Surname</label>
          <FormInput placeholder="Surname" onChange={(e) => this.handleInput('lname', e)} />
          <span style={{ color: "red" }}>{this.state.errors["last name"]}</span>
        </FormGroup>
        <PropertySelector properties={this.props.properties} errors={this.state.errors} onSubmit={this.handleInputProperty} />
        <Button onClick={this.handleSubmit}>Add Job</Button>
        <span style={{ color: "green" }}>{(this.props.response.status === 200 || this.props.response.status === 201) ? "Query succesful": ''}</span>
      </Form>




    )
  }
}

export default AddJob;


