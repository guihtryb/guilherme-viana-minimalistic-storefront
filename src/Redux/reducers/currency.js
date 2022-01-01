const INITIAL_STATE = {
  currency: "USD",
};

function currencyReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SWITCH_CURRENCY':
    return { 
      ...state,
      currency: action.currency,
    };
  default:
    return state;
  }
}

export default currencyReducer;