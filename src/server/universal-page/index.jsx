import config from 'config';
import React from 'react';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import Boom from 'boom';

import getHTMLTemplate from './template';
import configureStore from '../../store';

import App from '../../components/app';

import { ROUTES } from '../../constants';

const renderHTMTemplate = (data) => {
    let result;
    try {
        result = getHTMLTemplate(data);
    } catch (error) {
        console.error('error during render process', error);
        result = Boom.badImplementation();
    }
    return result;
};

const getDynamicStatePart = async (request) => {
    const { url } = request;

    const state = { };
    const route = { path: null, params: null };

    Object.keys(ROUTES).forEach((key) => {
        const { isExact, path, params } = matchPath(url, { path: ROUTES[key], exact: true }) || {};

        if (isExact === true) {
            route.path = path;
            route.params = params;
        }
    });

    // here you can prefetch proper data for proper route.
    // Notice that 'route.path' is an express path template and all params are in 'route.params' object.
    // for example: route.path = 'thing/:id' and request.url = '/thing/123' ---> route.params.id === 123
    // more info:
    // - https://expressjs.com/ru/guide/routing.html
    // - https://www.npmjs.com/package/path-to-regexp
    switch (route.path) {
        case ROUTES.HOME:
        default: break;
    }

    return state;
};

const getStaticStatePart = (buildHash) => (
    Object.assign(
        {},
        { buildHash },
        config.get('common'),
        config.get('client')
    )
);

const getUniversalPage = (data) => async (req, res) => {
    let state;
    let store;
    const { buildHash, useStatic } = data;
    const { url } = req;

    const staticStatePart = getStaticStatePart(buildHash);
    let dynamicStatePart = {};

    try {
        dynamicStatePart = await getDynamicStatePart(req, staticStatePart);
    } catch (error) {
        console.error('error during store preparation process', error);
    }

    state = Object.assign({}, dynamicStatePart, { config: staticStatePart });
    store = configureStore(state);

    let context = {};

    let application = (
        <Provider store={ store }>
            <StaticRouter location={ url } context={ context }>
                <App />
            </StaticRouter>
        </Provider>
    );

    const template = renderHTMTemplate({ application, buildHash, state, useStatic });

    return res.send(template);
};

export default getUniversalPage;
