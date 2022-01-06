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
    console.log(items);
    return (
      <div className="cart-product-container">
        {
          items.map((item, index) => (
            <div className="cart-product" key={index}>
              <div className="cart-product-infos">
                  <span className="cart-product-name">
                    { item.name }
                  </span>
                <span className="cart-product-price">
                  {`${currencySymbol(item)}${currentCurrency(item).amount}`}
                </span>
                {
                  item.productAttributes && item.productAttributes.map((attribute, index) => (
                  <div className="attribute-container" key={index}>
                    <div className="attribute-options">
                      { attribute.name === "Color" ?
                          attribute.items.map((item) => (
                            <div className="attribute-option-color" style={ { backgroundColor: item.value } } key={item.value} />
                          ))
                        : attribute.items.map((item) => (
                        <div className="attribute-option">
                          { item.value }
                          </div>
                        ))}
                    </div>
                  </div>
                  ))
                }

              </div>
              <div className="cart-product-quanty-and-image">
                <div className="product-quanty-control-container">
                  <button className="product-quanty-control-btn">
                    <span>
                      +
                    </span>
                  </button>
                  <span>
                    {item.quanty}
                  </span>
                  <button className="product-quanty-control-btn">
                  <span>
                    -
                  </span>
                  </button>
                </div>
                <img src={item.pic} alt="cart item" className="cart-product-image" />
              </div>
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