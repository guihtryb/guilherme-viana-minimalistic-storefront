import React, { Component } from 'react'
import Category from '../Components/Category'
import Header from '../Components/Header'
import Products from '../Components/Products'

import '../Style/Home.css'


export default class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <main className="home-page">
          <section className='category-and-products-container'>
          <Category />
          <Products />
          </section>
        </main>
      </>
    );
  }
}
