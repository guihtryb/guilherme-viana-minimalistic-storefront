import React, { Component } from 'react'
import '../Style/Header.css'
import  NavLinks from  '../Components/NavLinks'
import StoreLogo from './StoreLogo'
import CurrencySwitcher from './CurrencySwitcher'
import CartOverlay from './CartOverlay'


export default class Header extends Component {
  render() {
    return (
      <header className="header-container">
        <NavLinks />
        <StoreLogo />
        <div className="header-actions">
          <CurrencySwitcher />
          <CartOverlay />
        </div>
      </header>
    )
  }
}
