import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const configureStore = (initialState = {}) => {
    const composeEnhancers =
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;

    let middlewares = [thunk];

    const enhancer = composeEnhancers(
        applyMiddleware(...middlewares),
    );

    return createStore(
        reducers,
        initialState,
        enhancer
    );
};

export default configureStore;
