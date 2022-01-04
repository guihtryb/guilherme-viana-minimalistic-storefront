import React, { Component } from 'react'
import ReactImageMagnify from 'react-image-magnify';


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
              <img className="details-min-img" src={ image } alt="product.png" onClick={ () => this.imageToZoom(index)} key={index} />
            )
          }
        </div>
          <ReactImageMagnify {...{
            imageClassName: "details-lar-img",
            smallImage: {
              alt: 'Product',
              isFluidWidth: true,
              src: productItem.gallery[imageIndex],
            },
            largeImage: {
              src: productItem.gallery[imageIndex],
              width: 690,
              height: 700
            }
          }} />
      </section>
    )
  }
}
