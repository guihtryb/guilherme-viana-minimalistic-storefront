import React, { Component } from 'react'

export default class DetailsImages extends Component {
  render() {
    const { product } = this.props;
    console.log(product);
    return (
      <section className="details-images-section">
        <div className="details-min-img">
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
        <div className="details-lar-img"></div>
        DetailsImages
      </section>
    )
  }
}
