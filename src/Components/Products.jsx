import React, { Component } from 'react'

import ProductCard from '../Components/ProductCard'

import '../Style/Products.css'

export default class Products extends Component {
  render() {
    return (
      <section className="products-section">
        <div className="products-container">
          <ProductCard />
        </div>
      </section>
    )
  }
}
