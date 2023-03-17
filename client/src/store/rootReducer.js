import { combineReducers } from 'redux';

import userReducer from './user/reducer';
import articlesReducer from './articles/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    articles: articlesReducer
});

export default rootReducer;