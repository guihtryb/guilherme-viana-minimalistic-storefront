import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/Logo.png'

export default class StoreLogo extends Component {
  render() {
    return (
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
    );
  }
}
