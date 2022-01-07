import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ProductCard from '../Components/ProductCard';
import { connect } from 'react-redux';

import '../Style/Products.css';
import Loading from "../Images/Loading.gif"

class Products extends Component {
  render() {
    const { products, category } = this.props;
    if (!products.categories) return (
      <div className="products-container">
        <img className="loading" src={ Loading } alt="loading.gif"/>
      </div>
    )
    const currentProducts = products.categories.filter((currCategory) => currCategory.name === category);

    return (
      <section className="products-section">
        <div className="products-container">
          {
            currentProducts.map((item) => (
              item.products.map((product, index) => (
                <ProductCard product={ product } key={index} category={ category }/>
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
      id
      inStock
      gallery
      attributes {
        name
        items {
          value
        }
      }
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
