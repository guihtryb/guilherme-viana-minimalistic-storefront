const SWITCH_CURRENCY = 'SWITCH_CURRENCY';
const SWITCH_CATEGORY = 'SWITCH_CATEGORY';

export function switchCurrency(currency) {
  return ({
    type: SWITCH_CURRENCY,
    currency,
  })
}

export function switchCategory(category) {
  return ({
    type: SWITCH_CATEGORY,
    category,
  });
}