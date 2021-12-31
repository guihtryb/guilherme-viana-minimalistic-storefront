import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import '../Style/NavLinks.css';

class NavLinks extends Component {
  render() {
    const { categories } = this.props;
    const storeCategories = categories ? categories.categories : null;
    return (
      <nav className="navlinks-container">
        {
          storeCategories.map((category) => (
            <span className="navlink-span" key={category.name}>
              { category.name.toUpperCase() }
            </span>
          ))
        }
      </nav>
    );
  }
}

const CategoriesQuery = gql`
query {
  categories {
    name
  }
}
`;

export default graphql(CategoriesQuery, {
  name: 'categories',
})(NavLinks);
