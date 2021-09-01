import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddProduct from './AddProduct';
import TableMaker from './TableMaker';


/* Main Component */
class Main extends Component {

  constructor() {

    super();
    //Initialize the state in the constructor
    this.state = {
      products: [],
      properties: [],
      propertyIds: [],
    }
    this.handleAddProduct = this.handleAddProduct.bind(this);
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
      .then(products => {
        //Fetched product is stored in the state
        this.setState({ products });
        this.fetchPropertyIds(products);
      });
    fetch('/api/properties')
      .then(response => {
        return response.json();
      })
      .then(properties => {
        //Fetched product is stored in the state
        this.setState({ properties });
      });
  }

  fetchPropertyIds(products){
    const propertyIds = [];
        this.state.products.map(product =>{
          propertyIds.push(product.id);
        })
        this.setState({propertyIds})
  }

  handleAddProduct(product) {
    /*Fetch API for post request */
    fetch( 'api/jobs/', {
        method:'post',
        /* headers are important*/
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
         
        body: JSON.stringify(product)
    })
    .then(response => {

        return response.json();
    })
    fetch('/api/jobs')
      .then(response => {
        return response.json();
      })
      .then(products => {
        //Fetched product is stored in the state
        this.setState({ products });
      });
  
  }

  handleDelete(id) {

    fetch('api/jobs/' + id,
      { method: 'delete' });

        fetch('/api/jobs')
        .then(response => {

          return response.json();
        })
        .then(products => {
          //Fetched product is stored in the state
          this.setState({ products });
        });
     
  }
  
  handleUpdate(product, id) {

    fetch( 'api/jobs/' + id, {
        method:'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        return response.json();
    })
      fetch('/api/jobs')
      .then(response => {
        return response.json();
      })
      .then(products => {
        //Fetched product is stored in the state
        this.setState({ products });
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
        
        <TableMaker onUpdate = {this.handleUpdate} onDelete = {this.handleDelete} products={this.state.products} properties={this.state.properties}/>
        <AddProduct onAdd={this.handleAddProduct} properties={this.state.properties} />
      </div>
    );
  }
}

export default Main;

if (document.getElementById('root')) {
  ReactDOM.render(<Main />, document.getElementById('root'));
}

