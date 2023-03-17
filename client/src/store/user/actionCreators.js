import api, { catchErrorText } from '../../services/api';
import { setDataAction, setStatusAction, setErrorAction } from './actionTypes';
import STATUSES from '../statuses';

export const login = (username, password) => async (dispatch) => {
    dispatch(setError(null));
    dispatch(setStatus(STATUSES.PENDING));

    try {
        let data = await api.login(username, password);
        api.internal.setToken(data.token);
        dispatch(setData({
            username: data.user?.username,
            email: data.user?.email,
            permissions: data.user?.permissions
        }));
    } catch(err) {
        let error = catchErrorText(err);    
        dispatch(setError(error));
    } finally {
        dispatch(setStatus(STATUSES.COMPLETED));
    }
    
};

export const setData = (payload) => ({ type: setDataAction, payload });
export const setStatus = (payload) => ({ type: setStatusAction, payload });
export const setError = (payload) => ({ type: setErrorAction, payload });