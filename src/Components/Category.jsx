import React, { Component } from 'react';
import '../Style/Category.css';
import { connect } from 'react-redux';

class Category extends Component {
  render() {
    const { category } = this.props
    return (
      <section className="category-section">
        <div className="category-container">
          { category }
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.categoryReducer.category,
});

export default connect(mapStateToProps, null)(Category);