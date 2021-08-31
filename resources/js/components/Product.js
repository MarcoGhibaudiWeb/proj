import React, { Component } from 'react';
import DeleteProduct from './DeleteProduct';
import UpdateProductButton from './UpdateProductButton';

 
/* Stateless component or pure component
 * { product } syntax is the object destructing
 */  
const Product = ({product}) => {
    
  const divStyle = {
      /*code omitted for brevity */
  }
 
  //if the props product is null, return Product doesn't exist
  if(!product) {
    return(<div style={divStyle}>  Product Doesnt exist </div>);
  }
     
  //Else, display the product data
  return(  
    <div style={divStyle}> 
      <h2> {product.summary} </h2>
      <p> {product.description} </p>
      <h3> Status {product.availability ? 'Available' : 'Out of stock'} </h3>
      <h3> Price : {product.price} </h3> 
      <DeleteProduct currentProduct={product} />
      <UpdateProductButton currentProduct={product} />
    </div>
    
  )
}
 
export default Product ;