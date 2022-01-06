import React, { Component } from 'react'
import { connect } from 'react-redux';

class CartProduct extends Component {
  constructor() {
    super();
    this.renderCartItems = this.renderCartItems.bind(this)
  }

  renderCartItems() {
    const { items, currency } = this.props;

    const currentCurrency = (item) => item.prices.find((price) => price.currency === currency);
    const changes = {
      USD: "$",
      GBP: "£",
      AUD: "A$",
      JPY: "¥",
      RUB: "₽",
    };

    const currencySymbol = (item) => changes[currentCurrency(item).currency];

    return (
      <div className="cart-product-container">
        {
          items.map((item, index) => (
            <div className="cart-product" key={index}>
              <div className="cart-product-name-and-attributes">
                  <span className="cart-product-name">
                    { item.name }
                  </span>
                <span className="cart-product-price">
                  {`${currencySymbol(item)}${currentCurrency(item).amount}`}
                </span>
              </div>
              <div className="cart-product-quanty">
                <div className="product-quanty-control-btn">
                  +
                </div>
                <span>
                  {item.quanty}
                </span>
                <div className="product-quanty-control-btn">
                  -
                </div>
              </div>
              <img src={item.pic} alt="cart item" className="cart-product-image" />
            </div>
          ))
        }
      </div>
    )
  }

  render() {
    const { items } = this.props;
    return (
      <div>
        {  items.length >= 1 ? this.renderCartItems() : "" }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.cartItemsReducer.items,
  currency: state.currencyReducer.currency,
});

export default connect(mapStateToProps)(CartProduct);