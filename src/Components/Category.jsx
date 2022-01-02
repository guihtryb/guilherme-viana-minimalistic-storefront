import React, { Component } from 'react';
import '../Style/Category.css';
import { connect } from 'react-redux';

class Category extends Component {
  render() {
    const { category } = this.props;

    const categoryName = category[0].toUpperCase() + category.substr(1, category.length - 1);
    return (
      <section className="category-section">
        <div className="category-container">
          { categoryName }
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.categoryReducer.category,
});

export default connect(mapStateToProps, null)(Category);