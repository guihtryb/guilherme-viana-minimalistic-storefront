const INITIAL_STATE = {
  items: [],
};

function cartItemsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_ITEM_TO_CART':
    return {
      ...state,
      items: [...state.items, action.cart.items],
    };
    case 'REMOVE_ITEM_TO_CART':
      return {
        ...state,
        items: action.cart.items,
      };
  
  default:
    return state;
  }
}

export default cartItemsReducer;