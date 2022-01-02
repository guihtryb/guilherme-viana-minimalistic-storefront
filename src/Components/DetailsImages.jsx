import React, { Component } from 'react'

export default class DetailsImages extends Component {
  render() {
    const { product } = this.props;
    if (!product.length) return <h2>Loading...</h2>;

    const productItem = product[0];

    return (
      <section className="details-images-section">
        <div className="details-min-images">
          {
            productItem.gallery && productItem.gallery.map((image) =>
              <img className="details-min-img" src={ image } alt="product.png" />
            )
          }
        </div>
        <img className="details-lar-img" src={productItem.gallery[0]} alt=""/>
      </section>
    )
  }
}
