const INITIAL_STATE = {
  currency: "USD",
};

function currencyReducer(state = INITIAL_STATE, action) {
  const { type, currency } = action;
  switch (type) {
  case 'SWITCH_CURRENCY':
    return { 
      ...state,
      currency,
    };
  default:
    return state;
  }
}

export default currencyReducer;