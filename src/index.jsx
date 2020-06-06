import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader'

import App from './components/app/app';
import configureStore from './store';

const mountNode = document.getElementById('react-app');

const getApplication = store => () => (
    <Provider store={ store }>
        <BrowserRouter basename='/'>
            <App />
        </BrowserRouter>
    </Provider>
);

const renderApplication = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        mountNode
    );
};

const appRun = (appState) => {
    const store = configureStore(appState);

    renderApplication(getApplication(store));

    if (module.hot) {
        module.hot.accept('./components/app/app', () => { renderApplication(getApplication(store)) });
    }
};

if (typeof window !== 'undefined') {
    window.__main = appRun;
}
