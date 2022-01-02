import React, { Component } from 'react';

export default class DetailsCard extends Component {
  render() {
    return (
      <section className="details-info-section">
        <div className="details-infos">
          <h3 className="product-title"></h3>
          <h4 className="product-subtitle"></h4>
          <div className="product-attributes"></div>
          <div className="product-price"></div>
          <button className="details-btn-add-to-cart"></button>
          <article className="product-description"></article>
        </div>
        DetailsCard
      </section>
    );
  }
}
