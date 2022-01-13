import React, { Component } from 'react'
import { connect } from 'react-redux';
import { switchCurrency } from '../Redux/actions/index';

import { currenciesArray, currenciesObject } from '../Utils';

class CurrencySwitcher extends Component {
  constructor() {
    super();
    this.state = {
      showCurrencies: false,
    };

    this.showHideSwitcher = this.showHideSwitcher.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderCurrencySwitcher = this.renderCurrencySwitcher.bind(this);
  }

  showHideSwitcher() {
    this.setState((prevState) => ({ showCurrencies: !prevState.showCurrencies}));
  }

  handleClick(e) {
    const { switchCurrencyAction } = this.props;

    const value = e.target.innerText.split(" ");
    const newCurrency = value[1];
    switchCurrencyAction(newCurrency);
  }

  renderCurrencySwitcher() {
    return(
      <div className="currency-options">
        {
          currenciesArray.map((option) => (
            <p className="option" onClick={ this.handleClick } data-testid="currency-option" key={Object.keys(option)}>
            {`${Object.values(option)} ${Object.keys(option)}`}
            </p>
          ))
        }
      </div>
    )
  }

  render() {
    const { currency } = this.props;

    return (
      <div className="currency-switcher-container" data-testid="currency-switcher" onClick={this.showHideSwitcher}>
        <span> { currenciesObject[currency] } </span>
        <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg" className="currency-switcher">
          <path d="M1 0.5L4 3.5L7 0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {this.state.showCurrencies ? this.renderCurrencySwitcher() : null}
      </div>
    )
  }
}

const mapDispachToProps = (dispatch) => ({
  switchCurrencyAction: (currency) => dispatch(switchCurrency(currency)),
});

const mapStateToProps = (state) => ({
  currency: state.currencyReducer.currency,
});

export default connect(mapStateToProps, mapDispachToProps)(CurrencySwitcher);
