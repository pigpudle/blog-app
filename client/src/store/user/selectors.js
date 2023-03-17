import STATUSES from '../statuses';

export const isAuthenticatedSelector = state => !!state.user.data;
export const loadingSelector = state => state.user.status === STATUSES.PENDING;
export const errorSelector = state => state.user.error;