/* eslint react/no-danger: 0 */
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import isNil from 'lodash/isNil';

const getHTMLTemplate = (config) => {
    const { application, buildHash, state, useStatic } = config;

    const applicationState = JSON.stringify(state);
    const markup = renderToString(application);
    const hash =
        isNil(buildHash)
            ? ''
            : `${buildHash}.`;

    const template = renderToStaticMarkup(
        <html lang='ru'>
            <head id='head'>
                <title>fm</title>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, minimum-scale=1, maximum-scale=1, initial-scale=1, user-scalable=no'
                />
                { useStatic && <link rel='stylesheet' href={ `/assets/${hash}app.css` } /> }
            </head>
            <body>
                <div id='react-app' dangerouslySetInnerHTML={ { __html: markup } } />
                <script src={ `/assets/${hash}app.js` } />
                <script dangerouslySetInnerHTML={ { __html: `window.__main(${applicationState});` } } />
            </body>
        </html>
    );

    return `<!DOCTYPE html>${template}`;
};

export default getHTMLTemplate;
