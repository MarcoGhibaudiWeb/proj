import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';


class DeleteProduct extends Component {
 
    constructor(props) {
      super(props);
      
       
      //Boilerplate code for binding methods with `this`
      this.handleDelete = this.handleDelete.bind(this);
    }
     
    
    handleDelete() {
        this.props.onDelete(this.props.currentProduct.id);
    }
   
    render() {

       
        return <Button onClick={this.handleDelete}>Delete</Button>
         
    }
  }
   
  export default DeleteProduct;