import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, removeItem } from '../Redux/actions';
import PropTypes from 'prop-types';

import { currenciesObject } from '../Utils';
import emptyCart from '../Images/EmptyCart.png';

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
    };

    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.showHideCart = this.showHideCart.bind(this);
    this.renderCartItems = this.renderCartItems.bind(this);
    this.attributeStyle = this.attributeStyle.bind(this);
  }

  showHideCart() {
    this.setState((prevState) => ({ showCart: !prevState.showCart }));
    const mainTag = document.body.getElementsByTagName('main');

    if (mainTag[0].classList.contains('blurr')){
      return mainTag[0].classList.remove('blurr');
    }
    return mainTag[0].classList.add('blurr');
  }

  attributeStyle(item, attributeName, attributeItem) {
    const chosenStyle = item.attributesChosen.find((attribute) => Object
      .keys(attribute)[0] === attributeName && Object
      .values(attribute)[0] === attributeItem.value);

    return chosenStyle ? 'cart-overlay-chosen' : 'cart-overlay-attribute-option';
  }

  increaseQuantity(item) {
    const { items, removeItemToCartAction } = this.props;

    const cartItemsFiltered = items.filter((cartItem) => cartItem !== item);
    item.quantity += 1;

    const toCartEdited = [...cartItemsFiltered, item];
    removeItemToCartAction(toCartEdited);
  }

  decreaseQuantity(item) {
    const { items, removeItemToCartAction } = this.props;

    const cartItemsFiltered = items.filter((cartItem) => cartItem !== item);
    item.quantity += 1;

    if (item.quantity === 0) return removeItemToCartAction(cartItemsFiltered);

    const toCartEdited = [...cartItemsFiltered, item];
    removeItemToCartAction(toCartEdited);
  }

  renderCartItems() {
    const { items, currency } = this.props;

    console.log(items, currency);
    const currentCurrency = (item) => item.prices
      .find((price) => price.currency === currency);
    const currencySymbol = (item) => currenciesObject[currentCurrency(item).currency];

    const itemPrices = items.map((item) => {
      const price = item.prices.find((price) => price.currency === currency);
      const { quantity } = item;
      const total = price.amount * quantity;
      return ({
        total,
      });
    });

    const itemsSorted = items.sort((a, b) => (a.name < b.name ? -1 : 1));
    const productPrice = itemPrices.length ? itemPrices[0].total : 0;
    const totalPrice = itemPrices.length >= 2 ? itemPrices
      .reduce(((a, b) => a + b.total), 0) : productPrice;

    return (
      <div className="cart-items">
        <h3 className="my-bag">
          My Bag,
          {' '}
          <span className="bag-items-quantity" data-testid="bag-items-quantity">
            {items.length}
            {' '}
            { items.length > 1 ? 'items' : 'item'}
          </span>
        </h3>
        {
          itemsSorted.map((item, index) => (
            <div className="cart-item" key={ index }>
              <div className="cart-item-name-and-price">
                <div className="cart-item-name-container">
                  <span className="cart-item-name">
                    { item.name }
                  </span>
                </div>
                <span className="cart-item-price">
                  {`${currencySymbol(item)}${currentCurrency(item).amount}`}
                </span>
                {
                  item.productAttributes
                  && item.productAttributes.map((attribute, index2) => (
                    <div className="cart-overlay-attribute-container" key={ index2 }>
                      <div className="cart-overlay-attribute-options">
                        { attribute.name === 'Color'
                          ? attribute.items.map((attrItem) => (
                            <div
                              className="cart-overlay-attribute-option-color"
                              style={ { backgroundColor: attrItem.value } }
                              key={ attrItem.value }
                            />
                          ))
                          : attribute.items.map((attrItem) => (
                            <div
                              className={
                                `${this.attributeStyle(item, attribute.name, attrItem)}`
                              }
                              data-testid="attribute-value"
                              key={ attrItem.value }
                            >
                              { attrItem.value }
                            </div>
                          ))}
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="cart-item-quantity-and-image">
                <div className="item-quantity-control-container">
                  <button
                    type="button"
                    className="item-quantity-control-btn"
                    data-testid="increase-quantity-btn"
                    onClick={ () => this.increaseQuantity(item) }
                  >
                    +
                  </button>
                  <span data-testid="item-quantity">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="item-quantity-control-btn"
                    onClick={ () => this.decreaseQuantity(item) }
                  >
                    -
                  </button>
                </div>
                <img src={ item.pic } alt="cart item" className="cart-item-image" />
              </div>
            </div>
          ))
        }
        <div className="total-price-container">
          <span className="total-price-txt">Total</span>
          <span className="total-price-value">
            {currenciesObject[currency]}
            {totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="btn-container">
          <Link to="/cart">
            <button type="button" className="view-bag-btn">VIEW BAG</button>
          </Link>
          <button type="button" className="checkout-btn">CHECKOUT</button>
        </div>
      </div>
    );
  }

  render() {
    const { showCart } = this.state;
    const { items } = this.props;

    return (
      <div className="cart-overlay-container" data-testid="cart-icon">
        <div
          className="items-length"
          style={ items.length > 0 ? null : { display: 'none' } }
        >
          <span>
            { items.length }
          </span>
        </div>
        <img src={ emptyCart } alt="Empty Cart" onClick={ this.showHideCart } />
        { showCart ? this.renderCartItems() : null }
      </div>
    );
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

CartOverlay.propTypes = {
  removeItemToCartAction: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(String).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
