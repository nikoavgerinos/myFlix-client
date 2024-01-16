// Action Types
export const SET_FILTER = 'SET_FILTER';

// Action

export const setFilter = (value) => ({
    type: SET_FILTER,
    payload: value,
});
