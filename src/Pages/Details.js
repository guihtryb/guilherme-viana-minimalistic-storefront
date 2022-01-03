import React, { Component } from 'react'

import Header from '../Components/Header'
import DetailsImages from '../Components/DetailsImages'
import DetailsCard from '../Components/DetailsCard'

import '../Style/Details.css'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    }

    this.getProduct = this.getProduct.bind(this);
  }

  componentDidMount() {
    this.getProduct();
  }

  componentWillUnmount() {
    this.setState({
      product: [],
    })
  }

  getProduct() {
    const { products, category } = this.props;
    const { match: { params: {id} } } = this.props;
    const filterCategory = products.categories.filter((product) => product.name === category);
    const currProduct = filterCategory[0].products.find((product) => product.id === id);

    this.setState({
      product: [currProduct],
    });
  }

  // Details final style


  render() {
    const { product } = this.state;
    return (
      <>
      <Header />
      <main className="details-page">
        <DetailsImages product={ product }/>
        <DetailsCard product={ product }/>
      </main>
      </>
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
