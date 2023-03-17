import STATUSES from '../statuses';
import { setStatusAction, setErrorAction, setDataAction, deleteAction, setPaginationAction } from './actionTypes';

const url = new URL(window.location.href);

const initialState = {
    status: STATUSES.IDLE,
    error: null,
    data: {},
    pagination: {
        page: +url.searchParams.get("page") || 1,
        size: +url.searchParams.get("size") || 10,
        totalPages: 1
    }
};

function articlesReducer(state = initialState, action) {
    switch(action.type) {
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
        case setDataAction:
            return {
                ...state,
                data: action.payload.reduce((obj, article) => ({...obj, [article.id]: article}), {})
            };
        case setPaginationAction:
            return {
                ...state,
                pagination: action.payload
            };
        case deleteAction:
            const data = {...state.data};
            delete data[action.payload];
            return {
                ...state,
                data
            };
        default:
            return state;
    }
}

export default articlesReducer;