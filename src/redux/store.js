import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Make sure the path is correct

export const store = configureStore({
    reducer: rootReducer,
});