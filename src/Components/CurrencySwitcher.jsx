import React, { Component } from 'react'
import { connect } from 'react-redux';
import { switchCurrency } from '../Redux/actions/index';

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
    const options = [
      {USD: "$"},
      {GBP: "£"},
      {AUD: "A$"},
      {JPY: "¥"},
      {RUB: "₽"},
    ];

    return(
      <div className="currency-options">
        {options.map((option) => (
          <p className="option" onClick={this.handleClick}>
          {`${Object.values(option)} ${Object.keys(option)}`}
          </p>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="currency-switcher-container" onClick={this.showHideSwitcher}>
        <span>$</span>
        <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg" className="currency-switcher">
          <path d="M1 0.5L4 3.5L7 0.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {this.state.showCurrencies ? this.renderCurrencySwitcher() : null}
      </div>
    )
  }
}

const mapDispachToProps = (dispatch) => ({
  switchCurrencyAction: (currency) => dispatch(switchCurrency(currency)),
});

export default connect(null, mapDispachToProps)(CurrencySwitcher);
