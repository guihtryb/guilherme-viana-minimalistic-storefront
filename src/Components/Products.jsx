import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ProductCard from '../Components/ProductCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../Style/Products.css';
import Loading from '../Images/Loading.gif';

class Products extends Component {
  render() {
    const { products: { categories }, category } = this.props;
    if (!categories) return (
      <div className="products-container">
        <img className="loading" src={ Loading } alt="loading.gif" />
      </div>
    );

    const currentProducts = categories
      .filter((currCategory) => currCategory.name === category);

    return (
      <div className="products-container">
        {
          currentProducts.map((item) => (
            item.products.map((product, index) => (
              <ProductCard product={ product } key={ index } category={ category } />
            ))
          ))
        }
      </div>
    );
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

Products.propTypes = {
  products: PropTypes.objectOf(Object).isRequired,
  category: PropTypes.string.isRequired,
};

export default graphql(ProductsQuery, {
  name: 'products',
})(ProductsComp);
