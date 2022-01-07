import React, { Component } from 'react'

import CartProduct from '../Components/CartProduct'
import Header from '../Components/Header'

import '../Style/Cart.css'


export default class Cart extends Component {
  render() {
    return (
      <>
        <Header />
          <main className="cart-page">
            <h1 className="cart-title"> Cart </h1>
            <CartProduct />
          </main>
      </>
    )
  }
}
