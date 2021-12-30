import React, { Component } from 'react'

import Header from '../Components/Header'
import DetailsImages from '../Components/DetailsImages'
import DetailsCard from '../Components/DetailsCard'

import '../Style/Details.css'

export default class Details extends Component {
  render() {
    return (
      <div className="details-page">
        <Header />
        <DetailsImages />
        <DetailsCard />
      </div>
    )
  }
}
