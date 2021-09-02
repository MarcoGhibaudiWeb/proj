import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropertySelector from './PropertySelector';
import StatusSelector from './StatusSelector';
import { Form, FormTextarea, FormGroup, FormInput } from "shards-react";


class UpdateJobForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            row: props,
            value: {
                summary: props.currentJob.summary,
                description: props.currentJob.description,
                property: props.currentJob.property,
                status: props.currentJob.status,
            },
            errors: {},
            propertyName: '',

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInputProperty = this.handleInputProperty.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.getPropertyName = this.getPropertyName.bind(this);
    }

    componentDidMount() {
        this.getPropertyName(this.props.currentJob);
    }

    handleInput(key, e) {
        var state = Object.assign({}, this.state.value);
        state[key] = e.target.value;
        this.validateInput(key, e.target.value)
        this.setState({ value: state });

    }

    handleInputProperty(key, e) {
        var state = Object.assign({}, this.state.value);
        state[key] = e;
        this.validateInput(key, e)
        this.setState({ value: state });
        this.getPropertyName(state);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.errors["description"] && !this.state.errors["summary"] && !this.state.errors["property"] && !this.state.errors["status"] ) {
            let id = this.state.row.currentJob.id;
            this.props.onUpdate(this.state.value, id);
        }
        else {
          for (const key in this.state.value) {
            let value = this.state.value[key];
            this.validateInput(key, value);
          }
          alert('Please check any incorrect value')
        }
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
            if (value === null) {
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


    handleDelete() {
        this.props.onDelete(this.props.currentJob.id);
    }

    getPropertyName(state) {
        for (let i = 0; i < this.props.properties.length; i++) {
            if (this.props.properties[i].id == state.property) {
                this.setState({ propertyName: this.props.properties[i].name })

            }
        }

    }

    render() {
        const submitstyle = {
            marginLeft : "1rem",
            padding : "1rem",
        };
        const border = {
            border: "1px black solid",
            marginBottom : "1rem"
        };
        const span = {
            marginLeft: "0.3rem",
            
        }

        this.props.response.status

        return (
            <Form onSubmit={this.handleSubmit}>
                <h5>Edit job or Delete</h5>
                <FormGroup style={{ margin: "1rem 0" }}>
                    <label >Summary</label>
                    <FormTextarea placeholder="Max 150 char" value={this.state.value.summary} onChange={(e) => this.handleInput('summary', e)} />
                    <span style={{ color: "red" }}>{this.state.errors["summary"]}</span>
                </FormGroup>
                <FormGroup style={{ margin: "1rem 0" }}>
                    <label >Description</label>
                    <FormTextarea placeholder="Max 500 char" value={this.state.value.description} onChange={(e) => this.handleInput('description', e)} />
                    <span style={{ color: "red" }}>{this.state.errors["description"]}</span>
                </FormGroup>
                <FormGroup style={{ display: 'inline-block' }}>
                    <PropertySelector properties={this.props.properties} onSubmit={this.handleInputProperty} job={this.state.row.currentJob} />
                    <span style={span}>{(this.state.propertyName) ? this.state.propertyName : ''}</span>
                    <div style={border}></div>
                    <StatusSelector onSubmit={this.handleInputProperty} job={this.state.row.currentJob} />
                    <span style={span} >{(this.state.value.status) ? this.state.value.status : ''}</span>
                    <div style={border}></div>
                    <Button style={submitstyle} onClick={this.handleSubmit}>Update</Button>
                    <span style={{ color: "green" }}>{(this.props.response.status === 200) ? "Query succesful": ''}</span>
                    <Button onClick={this.handleDelete}>Delete</Button>

                </FormGroup>
            </Form>
        );
    }
}

export default UpdateJobForm;

