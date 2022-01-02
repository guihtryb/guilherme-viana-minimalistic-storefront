import React, { Component } from 'react'

export default class DetailsImages extends Component {
  render() {
    const { product } = this.props;
    console.log(product);
    return (
      <section className="details-images-section">
        <div className="details-min-images">
          <img className="details-min-img" src="" alt="" />
          <img className="details-min-img" src="" alt="" />
          <img className="details-min-img" src="" alt="" />
        </div>
        <img className="details-lar-img" src="" alt=""/>
      </section>
    )
  }
}
