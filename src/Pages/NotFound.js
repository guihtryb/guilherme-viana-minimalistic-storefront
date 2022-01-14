import React, { Component } from 'react';

import '../Style/NotFound.css';

export default class NotFound extends Component {
  render() {
    return (
      <main className='notfound-main'>
        <article>
          <h1>NotFound</h1>
          <p>
            This is not the web page you are looking for.
          </p>
        </article>
      </main>
    );
  }
}
