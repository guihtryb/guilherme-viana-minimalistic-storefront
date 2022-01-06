import React, { Component } from 'react'
import { connect } from 'react-redux';

class CartProduct extends Component {
  constructor() {
    super();
    this.renderCartItems = this.renderCartItems.bind(this)
    this.attributeStyle = this.attributeStyle.bind(this)
  }

  attributeStyle(item, attributeName, attributeItem) {
    const chosenStyle = item.attributesChosen.some((attribute) => Object.keys(attribute)[0] === attributeName && Object.values(attribute)[0] === attributeItem.value);
    return chosenStyle ? 'cart-overlay-chosen' : '';
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
              <div className="cart-product-infos">
                  <span className="cart-product-name">
                    { item.name }
                  </span>
                <span className="cart-product-price">
                  {`${currencySymbol(item)}${currentCurrency(item).amount}`}
                </span>
                {
                  item.productAttributes && item.productAttributes.map((attribute, index) => (
                    index < 1 &&
                  <div className="attribute-container" key={index}>
                    <div className="attribute-options">
                      { attribute.name === "Color" ?
                          attribute.items.map((attrItem) => (
                            <div className="cart-attribute-option-color" style={ { backgroundColor: attrItem.value } } key={item.value} />
                          ))
                        : attribute.items.map((attrItem) => (
                        <div className={`cart-attribute-option ${this.attributeStyle(item, attribute.name, attrItem) ? 'cart-chosen' : ''}`}>
                          { attrItem.value }
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