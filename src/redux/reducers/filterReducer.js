
import { SET_FILTER } from '../actions';

const initialState = {
    filter: '',
};

export default function filterReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload,
            };
        default:
            return state;
    }
}
