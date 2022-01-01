import { combineReducers } from 'redux';
import categoryReducer from './category';

const rootReducer = combineReducers({ categoryReducer });

export default rootReducer;
