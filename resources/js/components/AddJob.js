import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, FormTextarea, FormGroup, FormInput} from "shards-react";
import Button from '@material-ui/core/Button';
import PropertySelector from './PropertySelector';



class AddJob extends Component {

  constructor(props) {
    super(props);
    /* Initialize the state. */
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

    //Boilerplate code for binding methods with `this`
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleInputProperty = this.handleInputProperty.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  /* This method dynamically accepts inputs and stores it in the state */
  handleInput(key, e) {

    /*Duplicating and updating the state */
    var state = Object.assign({}, this.state.newJob);
    state[key] = e.target.value;
    if (this.validateInput(key, e.target.value)){

      this.setState({ newJob: state });
  };  }
  /* This method is invoked when submit button is pressed */
  handleSubmit(e) {
    //preventDefault prevents page reload   
    e.preventDefault();
    /*A call back to the onAdd props. The current
     *state is passed as a param
     */
     if(!this.state.errors["description"] && !this.state.errors["summary"] && !this.state.errors["first name"] && !this.state.errors["last name"] && this.state.newJob.property){
      this.props.onAdd(this.state.newJob);
}
      else{for(const key in this.state.newJob){
        let value = this.state.newJob[key];
        console.log(value);
        this.validateInput(key, value);
         }
         alert('Please fill any missing value')
        }
       
  }

  handleInputProperty(key, e) {
    /*Duplicating and updating the state */
    var state = Object.assign({}, this.state.newJob);
    state[key] = e;
    console.log(state);
    this.setState({ newJob: state });
}

validateInput(key, value){
  let errors = this.state.errors;
  let response = true;
  console.log(key);

  switch (key){
      
  case 'description':
      if (value.length > 500){
          errors["description"] = "Max 500 char";
          response =  false;
      }else if (value === null || value.match(/^ *$/) !== null){
        errors["description"] = "Can't be empty";
        response =  false;
      }else{        
        errors["description"] = "";}; 
  break;

  case 'summary':
          if(value.length > 150){
              errors["summary"] = "Max 150 char";
              response =  false;
          }else if (value === null || value.match(/^ *$/) !== null){
            errors["summary"] = "Can't be empty";
            response =  false;
          }else{errors["summary"] = "";}
  break;
  case 'fname':
          if(value.length > 20){
              errors["first name"] = "Max 20 char";
              response =  false;
          }else if (value === null || value.match(/^ *$/) !== null){
            errors["first name"] = "Can't be empty";
            response =  false;
          }else{errors["first name"] = "";}
  break;
  case 'lname':
          if(value.length > 20){
              errors["last name"] = "Max 20 char";
              response =  false;
          }else if (value === null || value.match(/^ *$/) !== null){
            errors["last name"] = "Can't be empty";
            response =  false;
          }else{errors["last name"] = "";}
  break;
  case 'property':
           if (value === null || value.match(/^ *$/) !== null){
            errors["property"] = "Can't be empty";
            response =  false;
          }else{errors["property"] = "";}
  break;
   


}
this.setState({errors: errors});
return response;}

  render() {

    return (

      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <label >Summary</label>
          <FormTextarea placeholder="Max 250 char" onChange={(e) => this.handleInput('summary', e)} />
          <span style={{color: "red"}}>{this.state.errors["summary"]}</span>
        </FormGroup>
        <FormGroup>
          <label >Description</label>
          <FormTextarea placeholder="Max 500 char" onChange={(e) => this.handleInput('description', e)} />
          <span style={{color: "red"}}>{this.state.errors["description"]}</span>
        </FormGroup>
        <FormGroup>
          <label >First Name</label>
          <FormInput placeholder="Name" onChange={(e) => this.handleInput('fname', e)} />
          <span style={{color: "red"}}>{this.state.errors["first name"]}</span>
        </FormGroup>
        <FormGroup>
          <label >Surname</label>
          <FormInput placeholder="Surname" onChange={(e) => this.handleInput('lname', e)} />
          <span style={{color: "red"}}>{this.state.errors["last name"]}</span>
        </FormGroup>
        <PropertySelector properties={this.props.properties} errors={this.state.errors} onSubmit={this.handleInputProperty} />
        <span style={{color: "red"}}>{this.state.errors["property"]}</span>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>




    )
  }
}

export default AddJob;


