import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import '../Style/NavLinks.css';
import { connect } from 'react-redux';
import { switchCategory } from '../Redux/actions';
import { Link } from 'react-router-dom';

class NavLinks extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({target}) {
    const { switchCategoryAction } = this.props;

    const { innerText } = target;
    const newCategory = innerText.toLowerCase();
    switchCategoryAction(newCategory);
  }

  render() {
    const { categories } = this.props;

    if (!categories.categories) return null;
    
    const storeCategories = categories.categories;
    return (
      <nav className="navlinks-container">
        {
          storeCategories.map((category) => (
              <span className="navlink-span" key={category.name} onClick={this.handleClick}>
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

const mapDispatchToProps = (dispatch) => ({
  switchCategoryAction: (category) => dispatch(switchCategory(category)),
});

const NavLinksComp = connect(null, mapDispatchToProps)(NavLinks);


export default graphql(CategoriesQuery, {
  name: 'categories',
})(NavLinksComp);
