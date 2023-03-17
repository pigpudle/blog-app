import { setStatusAction, setErrorAction, setDataAction, deleteAction, setPaginationAction } from './actionTypes';
import STATUSES from '../statuses';
import api, { catchErrorText } from '../../services/api';

export const loadArticles = ({ page, size } = {}) => async (dispatch) => {
    dispatch(setError(null));
    dispatch(setStatus(STATUSES.PENDING));

    try {
        const { data, pagination } = await api.getArticles({ page, size });
        dispatch(setData(data));
        dispatch(setPagination(pagination));
    } catch(err) {
        const error = catchErrorText(err);
        dispatch(setError(error));
    } finally {
        dispatch(setStatus(STATUSES.COMPLETED));
    }
};
export const loadArticle = (id) => async (dispatch) => {
    dispatch(setError(null));
    dispatch(setStatus(STATUSES.PENDING));

    try {
        const data = await api.getArticle(id);
        dispatch(setData([data]));
    } catch(err) {
        const error = catchErrorText(err);
        dispatch(setError(error));
    } finally {
        dispatch(setStatus(STATUSES.COMPLETED));
    }
};
export const deleteArticle = (id) => async (dispatch) => {
    const isConfirmed = window.confirm('Are you sure to delete this article?');
    if (isConfirmed) {
        try {
            await api.deleteArticle(id);
            dispatch({
                type: deleteAction,
                payload: id
            });
        } catch(err) {
            const error = catchErrorText(err);
            dispatch(setError(error));
        }
    }
};

const setStatus = payload => ({ type: setStatusAction, payload });
const setError = payload => ({ type: setErrorAction, payload });
const setData = payload => ({ type: setDataAction, payload });
export const setPagination = payload => ({ type: setPaginationAction, payload });