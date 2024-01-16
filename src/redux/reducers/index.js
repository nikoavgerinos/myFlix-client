
import { combineReducers } from '@reduxjs/toolkit';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
    filter: filterReducer, // This will allow you to access state.filter.filter
});

export default rootReducer;
