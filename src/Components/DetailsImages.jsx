import React, { Component } from 'react'

export default class DetailsImages extends Component {
  constructor() {
    super();
    this.state = {
      imageIndex: 0,
    }
    this.imageToZoom = this.imageToZoom.bind(this);
  }

  imageToZoom(index) {
    this.setState({
      imageIndex: index,
    });
  }

  render() {
    const { product } = this.props;
    const { imageIndex } = this.state;
    if (!product.length) return <h2>Loading...</h2>;

    const productItem = product[0];

    return (
      <section className="details-images-section">
        <div className="details-min-images">
          {
            productItem.gallery && productItem.gallery.map((image, index) =>
              <img className="details-min-img" data-testid="details-min-images" src={ image } alt="product.png" onClick={ () => this.imageToZoom(index)} key={index} />
            )
          }
        </div>
          <img src={productItem.gallery[imageIndex]} alt="product.png" />
      </section>
    )
  }
}
