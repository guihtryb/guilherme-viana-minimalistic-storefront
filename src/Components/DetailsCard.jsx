import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem, removeItem } from '../Redux/actions';

class DetailsCard extends Component {
  constructor() {
    super();

    this.addItemToCart = this.addItemToCart.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAttributesChange = this.handleAttributesChange.bind(this);
  }

  addItemToCart(name, prices, pic, quanty = 1) {
    const { addItemToCartAction, removeItemToCartAction, items, product } = this.props;

    const productItem = product[0];
    const productAttributes = productItem.attributes;
    const defaultAttrChosen = productAttributes.length ?
      {
        [productAttributes[0].name]: productAttributes[0].items[0].value
      } : [];

    const toCart = {
      name,
      prices,
      pic,
      quanty,
      productAttributes,
      attributesChosen: this.state === null ? [defaultAttrChosen] : [{...this.state}],
    };
    if (items.length === 0){
      return addItemToCartAction(toCart)
      };

      const notNewItem = items.filter((item) => item.name === toCart.name);
      const notNewItemAttributes = notNewItem ? notNewItem.map((item) => Object.values(item.attributesChosen[0])) : null;

      const toCartAttrs =  Object.values(Object.values(toCart.attributesChosen)[0]);
      const notNewByAttrs = notNewItemAttributes !== null ? notNewItem.find((_, index) => notNewItemAttributes[index].every((i, index) => i === toCartAttrs[index])) : null;

      if (notNewByAttrs) {
        const filtering = items.filter((item) => item !== notNewByAttrs);
        ++notNewByAttrs.quanty;
        const toCartEdited = [...filtering, notNewByAttrs];
        removeItemToCartAction(toCartEdited);
      } else {
        addItemToCartAction(toCart);
      }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleAttributesChange({ target }) {
    const { name } = target;
    const { value } = target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  render() {
    const { product, currency } = this.props;

    if (!product.length) return null;

    const currentCurrency = product[0].prices.find((price) => price.currency === currency);

    const changes = {
      USD: "$",
      GBP: "£",
      AUD: "A$",
      JPY: "¥",
      RUB: "₽",
    };

    const productItem = product[0];
    const productAttributes = productItem.attributes;
    const currencySymbol = changes[currentCurrency.currency];
    const htmlStr = productItem.description;
    const parser = new DOMParser();
    const productDescrip = parser.parseFromString(htmlStr, "text/html").body.textContent || "";

    return (
      <aside>
        <div className="details-infos">
          <span className="product-title">
            { productItem.name }
          </span>
          <form onSubmit={this.handleSubmit} className="product-attributes">
            {
              productAttributes.map((attribute, index) => (
              <div className="attribute-container" key={index}>
                <h2 className="attribute-name">
                  { attribute.name }:
                </h2>
                <div className="attribute-options">
                  {
                    attribute.items.map((item, index) => {
                      if (attribute.name === "Color") {
                        return (
                          <label htmlFor={item.value} key={index}>
                            <input id={ item.value } className="attribute-option-color" name={ attribute.name }  style={ { backgroundColor: item.value } } readOnly onClick={ this.handleAttributesChange }/>
                          </label>
                        );
                      }
                      return (
                        <label htmlFor={item.value} key={index}>
                          <input className="attribute-option" name={ attribute.name } value={item.value} key={index} readOnly onClick={ this.handleAttributesChange } />
                        </label>
                      );
                    })
                  }
                </div>
              </div>
              ))
            }
          </form>
          <div className="product-price">
            <h2 className="details-price-atr">PRICE:</h2>
            <span className="details-price">{ `${currencySymbol}${currentCurrency.amount}` }</span>
          </div>
          <button className="details-btn-add-to-cart" type="submit" disabled={ productItem.inStock ? false : true } onClick={() => this.addItemToCart(productItem.name, productItem.prices, productItem.gallery[0])}>
            ADD TO CART
          </button>
          <div className="product-description">
          { productDescrip }
          </div>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencyReducer.currency,
  items: state.cartItemsReducer.items,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCartAction: (item) => dispatch(addItem(item)),
  removeItemToCartAction: (item) => dispatch(removeItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsCard);
