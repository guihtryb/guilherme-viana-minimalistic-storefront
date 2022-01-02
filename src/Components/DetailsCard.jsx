import React, { Component } from 'react';

export default class DetailsCard extends Component {
  render() {
    const { product } = this.props;
    if (!product.length) return <h2>Loading...</h2>

    const productItem = product[0];

    return (
      <section className="details-info-section">
        <div className="details-infos">
          <h3 className="product-title">
            { productItem.name }
          </h3>
          <div className="product-attributes"></div>
          <div className="product-price">
            <h2>PRICE:</h2>
            <span></span>
          </div>
          <button className="details-btn-add-to-cart">
            ADD TO CART
          </button>
          <p className="product-description">
          </p>
        </div>
      </section>
    );
  }
}
