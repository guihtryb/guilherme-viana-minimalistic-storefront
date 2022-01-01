const INITIAL_STATE = {
  category: "tech",
};

function categoryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SWITCH_CATEGORY':
    return { 
      ...state,
      category: action.category,
    };
  default:
    return state;
  }
}

export default categoryReducer;