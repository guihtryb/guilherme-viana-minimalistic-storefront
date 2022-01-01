import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ProductCard from '../Components/ProductCard';

import '../Style/Products.css'
import { connect } from 'react-redux';

class Products extends Component {
  render() {
    const { products, category } = this.props;
    const currentProducts = products.categories.filter((currCategory) => currCategory.name === category);
    
    return (
      <section className="products-section">
        <div className="products-container">
          {
            currentProducts.map((item) => (
              item.products.map((product) => (
                <ProductCard product={product}/>
              ))
            ))
          }
        </div>
      </section>
    )
  }
}

const ProductsQuery = gql`
query {
  categories {
	  name
    products {
	    name
      gallery
      prices {
        currency
        amount
      }
    }
  }
}`;

const mapStateToProps = (state) => ({
  category: state.categoryReducer.category,
});

const ProductsComp = connect(mapStateToProps, null)(Products);

export default graphql(ProductsQuery, {
  name: 'products',
})(ProductsComp);
