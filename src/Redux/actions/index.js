const SWITCH_CURRENCY = 'SWITCH_CURRENCY';
const SWITCH_CATEGORY = 'SWITCH_CATEGORY';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const REMOVE_ITEM_TO_CART = 'REMOVE_ITEM_TO_CART';

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

export function addItem(items) {
  return ({
    type: ADD_ITEM_TO_CART,
    cart: {
      items,
    },
  });
}
export function removeItem(items) {
  return ({
    type: REMOVE_ITEM_TO_CART,
    cart: {
      items,
    },
  });
}