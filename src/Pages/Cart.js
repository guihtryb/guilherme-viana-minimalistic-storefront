import React, { Component } from 'react'

import CartProduct from '../Components/CartProduct'
import Category from '../Components/Category'
import Header from '../Components/Header'

import '../Style/Cart.css'


export default class Cart extends Component {
  render() {
    return (
      <div>
        <Header />
        <Category />
        <CartProduct />
      </div>
    )
  }
}
