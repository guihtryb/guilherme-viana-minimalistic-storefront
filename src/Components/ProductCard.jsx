import React, { Component } from 'react'
import '../Style/ProductCard.css'


export default class ProductCard extends Component {
  render() {
    return (
      <div className="product-card">
        <div className="product-image"/>
          <div className="product-infos">
          <span className="product-name"> Xbox 360 </span>
          <span className="product-price"> $50.60 </span>
        </div>
      </div>
    )
  }
}
