import { combineReducers } from 'redux';
import categoryReducer from './category';
import currencyReducer from './currency';

const rootReducer = combineReducers({ categoryReducer, currencyReducer });

export default rootReducer;
