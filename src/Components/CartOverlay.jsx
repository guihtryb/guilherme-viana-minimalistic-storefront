import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, removeItem } from '../Redux/actions';

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
    };

    this.increaseQuanty = this.increaseQuanty.bind(this);
    this.decreaseQuanty = this.decreaseQuanty.bind(this);
    this.showHideCart = this.showHideCart.bind(this);
    this.renderCartItems = this.renderCartItems.bind(this);
    this.attributeStyle = this.attributeStyle.bind(this);
  }

  showHideCart() {
    this.setState((prevState) => ({ showCart: !prevState.showCart}));
  }

  attributeStyle(item, attributeName, attributeItem) {
    const chosenStyle = item.attributesChosen.find((attribute) => Object.keys(attribute)[0] === attributeName && Object.values(attribute)[0] === attributeItem.value)
    return chosenStyle ? 'cart-overlay-chosen' : 'cart-overlay-attribute-option';
  }

  increaseQuanty(item) {
    const { items, removeItemToCartAction } = this.props;

    const filtering = items.filter((cartItem) => cartItem !== item);
    ++item.quanty;

    const toCartEdited = [...filtering, item];
    removeItemToCartAction(toCartEdited)
  }

  decreaseQuanty(item) {
    const { items, removeItemToCartAction } = this.props;

    const filtering = items.filter((cartItem) => cartItem !== item);
    --item.quanty;

    if (item.quanty === 0) return removeItemToCartAction(filtering);

    const toCartEdited = [...filtering, item];
    removeItemToCartAction(toCartEdited)
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

    const itemPrices = items.map((item) => {
      const price = item.prices.find((price) => price.currency === currency);
      const quanty = item.quanty;
      const total = price.amount * quanty;
      return ({
        total
      });
    });

    const itemsSorted = items.sort((a, b) => a.name < b.name ? -1 : 1);
    const productPrice =  itemPrices.length ? itemPrices[0].total : 0;
    const totalPrice = itemPrices.length >= 2 ? itemPrices.reduce(((a, b) => a + b.total), 0) : productPrice;

    return (
      <div className="cart-items">
        <h3 className="my-bag">My Bag, <span className="bag-items-quanty">{items.length} { items.length > 1 ? "items" : "item"}</span></h3>
        {
          itemsSorted.map((item, index) => (
            <div className="cart-item" key={index}>
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
                  item.productAttributes && item.productAttributes.map((attribute, index) => (
                    index < 1 &&
                    <div className="cart-overlay-attribute-container" key={index}>
                      <div className="cart-overlay-attribute-options">
                        { attribute.name === "Color" ?
                            attribute.items.map((attrItem) => (
                              <div className="cart-overlay-attribute-option-color" style={ { backgroundColor: attrItem.value } } key={attrItem.value} />
                            ))
                          : attribute.items.map((attrItem) => (
                          <div className={`${ this.attributeStyle(item, attribute.name, attrItem) }`} key={attrItem.value}>
                            { attrItem.value }
                            </div>
                          ))}
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="cart-item-quanty-and-image">
                <div className="item-quanty-control-container">
                  <button className="item-quanty-control-btn" onClick={ () => this.increaseQuanty(item) }>
                    +
                  </button>
                  <span>
                    {item.quanty}
                  </span>
                  <button className="item-quanty-control-btn" onClick={ () => this.decreaseQuanty(item) }>
                    -
                  </button>
                </div>
                <img src={item.pic} alt="cart item" className="cart-item-image" />
              </div>
            </div>
          ))
        }
        <div className="total-price-container">
          <span className="total-price-txt">Total</span>
          <span className="total-price-value">{changes[currency]} {totalPrice.toFixed(2)}</span>
        </div>
        <div className="btn-container">
          <Link to="/cart">
            <button className="view-bag-btn">VIEW BAG</button>
          </Link>
          <button className="checkout-btn">CHECKOUT</button>
        </div>
      </div>
    )
  }

  render() {
    const { showCart } = this.state;

    return (
      <div className="cart-overlay-container" data-testid="cart-icon">
        <div className="cart-upper">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5613 3.87359C19.1822 3.41031 18.5924 3.12873 17.9821 3.12873H5.15889L4.75914 1.63901C4.52718 0.773016 3.72769 0.168945 2.80069 0.168945H0.653099C0.295301 0.168945 0 0.450523 0 0.793474C0 1.13562 0.294459 1.418 0.653099 1.418H2.80069C3.11654 1.418 3.39045 1.61936 3.47434 1.92139L6.04306 11.7077C6.27502 12.5737 7.07451 13.1778 8.00152 13.1778H16.4028C17.3289 13.1778 18.1507 12.5737 18.3612 11.7077L19.9405 5.50575C20.0877 4.941 19.9619 4.33693 19.5613 3.87365L19.5613 3.87359ZM18.6566 5.22252L17.0773 11.4245C16.9934 11.7265 16.7195 11.9279 16.4036 11.9279H8.00154C7.68569 11.9279 7.41178 11.7265 7.32789 11.4245L5.49611 4.39756H17.983C18.1936 4.39756 18.4042 4.49824 18.5308 4.65948C18.6567 4.81994 18.7192 5.0213 18.6567 5.22266L18.6566 5.22252Z" fill="#43464E"/>
          </svg>
        </div>
        <div className="cart-wheels-container" onClick={ this.showHideCart } >
          <div className="cart-first-wheel">
            <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.44437 0.981402C1.2443 0.981402 0.254883 1.92762 0.254883 3.07511C0.254883 4.2226 1.24439 5.16882 2.44437 5.16882C3.64445 5.1696 4.63386 4.22339 4.63386 3.07571C4.63386 1.92804 3.64436 0.981201 2.44437 0.981201V0.981402ZM2.44437 3.90108C1.9599 3.90108 1.58071 3.53847 1.58071 3.07519C1.58071 2.61191 1.9599 2.24931 2.44437 2.24931C2.92885 2.24931 3.30804 2.61191 3.30804 3.07519C3.30722 3.5188 2.90748 3.90108 2.44437 3.90108Z" fill="#43464E"/>
            </svg>
          </div>
          <div className="cart-second-wheel">
            <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.44437 0.981402C1.2443 0.981402 0.254883 1.92762 0.254883 3.07511C0.254883 4.2226 1.24439 5.16882 2.44437 5.16882C3.64445 5.1696 4.63386 4.22339 4.63386 3.07571C4.63386 1.92804 3.64436 0.981201 2.44437 0.981201V0.981402ZM2.44437 3.90108C1.9599 3.90108 1.58071 3.53847 1.58071 3.07519C1.58071 2.61191 1.9599 2.24931 2.44437 2.24931C2.92885 2.24931 3.30804 2.61191 3.30804 3.07519C3.30722 3.5188 2.90748 3.90108 2.44437 3.90108Z" fill="#43464E"/>
            </svg>
            </div>
          </div>
            { (showCart) ? this.renderCartItems() : null }
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


export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);