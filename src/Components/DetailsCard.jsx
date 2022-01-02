import React, { Component } from 'react';
import { connect } from 'react-redux';

class DetailsCard extends Component {
  render() {
    const { product, currency } = this.props;

    if (!product.length) return null;
    console.log(product);
    const currentCurrency = product[0].prices.find((price) => price.currency === currency);
    const changes = {
      USD: "$",
      GBP: "£",
      AUD: "A$",
      JPY: "¥",
      RUB: "₽",
    };
    const currencySymbol = changes[currentCurrency.currency];
    console.log(currentCurrency);
    const productItem = product[0];
    const htmlStr = productItem.description;
    const parser = new DOMParser();
    
    const productDescrip = parser.parseFromString(htmlStr, "text/html").body.textContent || "";

    return (
      <section className="details-info-section">
        <div className="details-infos">
          <h3 className="product-title">
            { productItem.name }
          </h3>
          <div className="product-attributes"></div>
          <div className="product-price">
            <h2>PRICE:</h2>
            <span>{ `${currencySymbol}${currentCurrency.amount}` }</span>
          </div>
          <button className="details-btn-add-to-cart">
            ADD TO CART
          </button>
          <div>
          { productDescrip }
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencyReducer.currency,
});

export default connect(mapStateToProps)(DetailsCard);
