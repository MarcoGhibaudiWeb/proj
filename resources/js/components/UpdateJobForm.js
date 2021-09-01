import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropertySelector from './PropertySelector';
import StatusSelector from './StatusSelector';
import TableCell from '@material-ui/core/TableCell';
import { Form, FormTextarea, FormGroup, FormInput } from "shards-react";


class UpdateJobForm extends Component {

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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInputProperty = this.handleInputProperty.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    handleInput(key, e) {
        var state = Object.assign({}, this.state.value);
        state[key] = e.target.value;
        if (this.validateInput(key, e.target.value)) {
            this.setState({ value: state });
        };
    }

    handleInputProperty(key, e) {
        var state = Object.assign({}, this.state.value);
        state[key] = e;
        this.setState({ value: state });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.errors["description"] && !this.state.errors["summary"]) {
            let id = this.state.row.currentJob.id;
            this.props.onUpdate(this.state.value, id);
        }
        else { alert('Please fill any missing value') }
    }

    validateInput(key, value) {
        let errors = this.state.errors;
        let response = true;
        switch (key) {
            case 'description':
                if (value.length > 500) {
                    errors["description"] = "Max 500 char";
                    response = false;
                } else { errors["description"] = ""; };
                break;

            case 'summary':
                if (value.length > 150) {
                    errors["summary"] = "Max 150 char";
                    response = false;
                } else { errors["summary"] = ""; };
        }
        this.setState({ errors: errors });
        return response;
    }

    handleDelete() {
        this.props.onDelete(this.props.currentJob.id);
    }

    render() {
        const submitstyle = {
            position: "relative",
            right: "1rem"
        };
        const border = {
            border: "1px black solid",
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <h5>Edit job or Delete</h5>
                <FormGroup style={{ margin: "1rem 0" }}>
                    <label >Summary</label>
                    <FormTextarea placeholder="Max 250 char" onChange={(e) => this.handleInput('summary', e)} />
                    <span style={{ color: "red" }}>{this.state.errors["summary"]}</span>
                </FormGroup>
                <FormGroup style={{ margin: "1rem 0" }}>
                    <label >Description</label>
                    <FormTextarea placeholder="Max 500 char" onChange={(e) => this.handleInput('description', e)} />
                    <span style={{ color: "red" }}>{this.state.errors["description"]}</span>
                </FormGroup>
                <FormGroup>
                    <PropertySelector properties={this.props.properties} onSubmit={this.handleInputProperty} job={this.state.row.currentJob} />
                    <StatusSelector onSubmit={this.handleInputProperty} job={this.state.row.currentJob} />
                    <div style={border}></div>
                    <TableCell style={submitstyle}>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </TableCell>
                    <TableCell >
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </TableCell>
                </FormGroup>
            </Form>
        );
    }
}

export default UpdateJobForm;

