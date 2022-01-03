import React, { Component } from 'react';
import { connect } from 'react-redux';

class DetailsCard extends Component {
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

    const productsAttributes = productItem.attributes;
    console.log(productsAttributes);
    const currencySymbol = changes[currentCurrency.currency];
    const htmlStr = productItem.description;
    const parser = new DOMParser();
    
    const productDescrip = parser.parseFromString(htmlStr, "text/html").body.textContent || "";

    return (
      <section>
        <div className="details-infos">
          <span className="product-title">
            { productItem.name }
          </span>
          <div className="product-attributes">
            {
              productsAttributes.map((attribute) => (
              <div className="attribute-container" key={attribute.name}>
                <h2 className="attribute-name">
                  { attribute.name }:
                </h2>
                <div className="attribute-options">
                  {
                    attribute.items.map((item) => {
                      if (attribute.name === "Color") {
                        return (
                        <div className="attribute-option-color" style={ { backgroundColor: item.value } } key={item.value}></div>
                        );
                      }
                      return (
                        <div className="attribute-option">
                            <span>{item.value}</span>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
              ))
            }
          </div>
          <div className="product-price">
            <h2 className="details-price-atr">PRICE:</h2>
            <span className="details-price">{ `${currencySymbol}${currentCurrency.amount}` }</span>
          </div>
          <button className="details-btn-add-to-cart">
            ADD TO CART
          </button>
          <div className="product-description">
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
