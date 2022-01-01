import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../Style/ProductCard.css'


class ProductCard extends Component {
  render() {
    const { product, currency } = this.props;
    const currentCurrency = product.prices.find((price) => price.currency === currency);
    const changes = {
      USD: "$",
      GBP: "£",
      AUD: "A$",
      JPY: "¥",
      RUB: "₽",
    };
    const currencySymbol = changes[currentCurrency.currency];
    return (
      <div className="product-card" key={product.name}>
        <img className="product-image" src={product.gallery[0]} alt="product"/>
          <div className="product-infos">
          <span className="product-name"> { product.name } </span>
          <span className="product-price"> { `${currencySymbol}${currentCurrency.amount}` } </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencyReducer.currency,
});

export default connect(mapStateToProps, null)(ProductCard);