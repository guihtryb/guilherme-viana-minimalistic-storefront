import React, { Component } from 'react';
import '../Style/Category.css';
import { connect } from 'react-redux';

class Category extends Component {
  render() {
    const { category } = this.props;
    const categoryName = category[0].toUpperCase() + category.substr(1, category.length - 1);

    return (
        <div className="category-container">
          <span data-testid="category-name">
            { categoryName }
          </span>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.categoryReducer.category,
});

export default connect(mapStateToProps, null)(Category);