import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addItem, removeItem } from '../Redux/actions';

import { currenciesObject } from '../Utils';

class CartProduct extends Component {
  constructor() {
    super();
    this.renderCartItems = this.renderCartItems.bind(this)
    this.attributeStyle = this.attributeStyle.bind(this)
    this.increaseQuantity = this.increaseQuantity.bind(this)
    this.decreaseQuantity = this.decreaseQuantity.bind(this)
  }

  attributeStyle(item, attributeName, attributeItem) {
    const chosenStyle = item.attributesChosen.some((attribute) => Object.keys(attribute)[0] === attributeName && Object.values(attribute)[0] === attributeItem.value);
    return chosenStyle ? 'cart-overlay-chosen' : '';
  }

  increaseQuantity(item) {
    const { items, removeItemToCartAction } = this.props;

    const filtering = items.filter((cartItem) => cartItem !== item);
    ++item.quantity;

    const toCartEdited = [...filtering, item];
    removeItemToCartAction(toCartEdited)
  }

  decreaseQuantity(item) {
    const { items, removeItemToCartAction } = this.props;

    const filtering = items.filter((cartItem) => cartItem !== item);
    --item.quantity;

    if (item.quantity === 0) return removeItemToCartAction(filtering);

    const toCartEdited = [...filtering, item];
    removeItemToCartAction(toCartEdited)
  }

  renderCartItems() {
    const { items, currency } = this.props;
    const currentCurrency = (item) => item.prices.find((price) => price.currency === currency);
    const currencySymbol = (item) => currenciesObject[currentCurrency(item).currency];
    const itemsSorted = items.sort((a, b) => a.name < b.name ? -1 : 1);

    return (
      <div className="cart-product-container">
        {
          itemsSorted.map((item, index) => (
            <div className="cart-product" key={index}>
              <div className="cart-product-infos">
                  <span className="cart-product-name" data-testid="cart-product-name">
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
                            <div className="cart-attribute-option-color" style={ { backgroundColor: attrItem.value } } key={attrItem.value} />
                          ))
                        : attribute.items.map((attrItem) => (
                        <div data-testid="attribute-option" className={`cart-attribute-option ${this.attributeStyle(item, attribute.name, attrItem) ? 'cart-chosen' : ''}`} key={attrItem.value}>
                          { attrItem.value }
                          </div>
                        ))}
                    </div>
                  </div>
                  ))
                }
              </div>
              <div className="cart-product-quantity-and-image">
                <div className="product-quantity-control-container">
                  <button className="product-quantity-control-btn" onClick={ () => this.increaseQuantity(item)}>
                      +
                  </button>
                  <span>
                    {item.quantity}
                  </span>
                  <button className="product-quantity-control-btn" onClick={ () => this.decreaseQuantity(item)}>
                    -
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

const mapDispatchToProps = (dispatch) => ({
  addItemToCartAction: (item) => dispatch(addItem(item)),
  removeItemToCartAction: (item) => dispatch(removeItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);