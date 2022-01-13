import React, { Component } from 'react'

import Header from '../Components/Header'
import DetailsImages from '../Components/DetailsImages'
import DetailsCard from '../Components/DetailsCard'

import '../Style/Details.css'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Details extends Component {
  render() {
    const { products } = this.props;
    const { match: { params: { id, category } } } = this.props;

    if (!products.categories) return <h3>Loading...</h3>

    const filterCategory = products.categories.filter((product) => product.name === category);
    const currProduct = [filterCategory[0].products.find((product) => product.id === id)];
    return (
      <>
        <Header />
        <main className="details-main">
          <div className="details-container">
            <DetailsImages product={ currProduct }/>
            <DetailsCard product={ currProduct }/>
          </div>
        </main>
      </>
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
      description
      prices {
        currency
        amount
      }
      attributes {
        name
        items {
          value
        }
      }
    }
  }
}`;

const mapStateToProps = (state) => ({
  category: state.categoryReducer.category,
});

const DetailsComp = connect(mapStateToProps)(Details);


export default graphql(ProductsQuery, {
  name: 'products',
})(DetailsComp);
