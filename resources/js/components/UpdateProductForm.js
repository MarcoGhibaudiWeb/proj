import React, { Component } from 'react';
import UpdateProductButton from './UpdateProductButton';
import Button from '@material-ui/core/Button';
import PropertySelector from './PropertySelector';
import StatusSelector from './StatusSelector';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Form, FormTextarea, FormGroup, FormInput } from "shards-react";
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';






class UpdateProductForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            row: props,
            value: {
                summary: props.summary,
                description: props.description,
                property: props.property,
                status: props.status,
            },
            errors: {}
            
        }

        //Boilerplate code for binding methods with `this`
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInputProperty = this.handleInputProperty.bind(this);
        this.validateInput = this.validateInput.bind(this);


    }


    handleInput(key, e) {

        /*Duplicating and updating the state */
        var state = Object.assign({}, this.state.value);
        state[key] = e.target.value;
        if (this.validateInput(key, e.target.value)){

            this.setState({ value: state });
        };
    }
    handleInputProperty(key, e) {

        /*Duplicating and updating the state */
        var state = Object.assign({}, this.state.value);
        state[key] = e;
        this.setState({ value: state });
    }
    /* This method is invoked when submit button is pressed */
    handleSubmit(e) {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        if(!this.state.errors["description"] && !this.state.errors["summary"] ){
        let id = this.state.row.currentProduct.id;
        this.props.onUpdate(this.state.value, id);}
        else{ alert('Please fill any missing value')}

    }

validateInput(key, value){
    let errors = this.state.errors;
    let response = true;
    console.log(errors);

    switch (key){
        
    case 'description':
        if (value.length > 500){
            errors["description"] = "Max 500 char";
            response =  false;
        }else{errors["description"] = "";};
        break;

    case 'summary':
            if(value.length > 150){
                console.log('pappa');
                errors["summary"] = "Max 150 char";
                response =  false;
            }else{errors["summary"] = "";};


}
this.setState({errors: errors});
return response;
}



    handleDelete() {
        this.props.onDelete(this.props.currentProduct.id);
    }



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
              <PropertySelector properties={this.props.properties} job={this.state.row}  onSubmit={this.handleInputProperty} />
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Form>
      
      
      
      
          

        );
    }
}

export default UpdateProductForm;

