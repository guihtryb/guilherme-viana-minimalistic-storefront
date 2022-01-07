import React, { Component } from 'react'

import '../Style/NotFound.css'

export default class NotFound extends Component {
  render() {
    return (
      <div className='notfound-page'>
        <h1>NotFound</h1>
        <p>"This is not the web page you are looking for."</p>
      </div>
    )
  }
}
