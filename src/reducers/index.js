import { combineReducers } from 'redux';

import appReducer from './app-reducer';

const reducers = {
    app: appReducer,
    config: (config = {}) => config
};

export default combineReducers(reducers);
