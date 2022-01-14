import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DetailsImages extends Component {
  constructor() {
    super();
    this.state = {
      imageIndex: 0,
    };
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
            productItem.gallery && productItem.gallery.map((image, index) => (
              <img
                key={ index }
                className="details-min-img"
                data-testid="details-min-images"
                src={ image }
                alt="product.png"
                onClick={ () => this.imageToZoom(index) }
              />
            ))
          }
        </div>
        <img src={ productItem.gallery[imageIndex] } alt="product.png" />
      </section>
    );
  }
}

DetailsImages.propTypes = {
  product: PropTypes.arrayOf(Object).isRequired,
};