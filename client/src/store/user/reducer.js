import { setDataAction, setStatusAction, setErrorAction } from './actionTypes';
import STATUSES from '../statuses';

const intialState = {
    status: STATUSES.IDLE,
    error: null,
    data: null
};

function userReducer(state = intialState, action) {
    switch(action.type) {
        case setDataAction:
            return {
                ...state,
                data: action.payload
            };
        case setStatusAction:
            return {
                ...state,
                status: action.payload
            };
        case setErrorAction:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

export default userReducer;