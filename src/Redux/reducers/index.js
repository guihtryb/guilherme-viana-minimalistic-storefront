import { combineReducers } from 'redux';
import categoryReducer from './category';
import currencyReducer from './currency';
import cartItemsReducer from './cart';

const rootReducer = combineReducers({ categoryReducer, currencyReducer, cartItemsReducer });

export default rootReducer;
