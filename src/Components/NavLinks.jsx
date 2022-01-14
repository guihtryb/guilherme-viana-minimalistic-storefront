import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import { switchCategory } from '../Redux/actions';
import '../Style/NavLinks.css';

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
            <Link
              key={ category.name }
              onClick={ (e) => this.handleClick(e) }
              to='/'
            >
              { category.name.toUpperCase() }
            </Link>
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

NavLinks.propTypes = {
  switchCategoryAction: PropTypes.func.isRequired,
  categories: PropTypes.objectOf(Object).isRequired,
};

export default graphql(CategoriesQuery, {
  name: 'categories',
})(NavLinksComp);
