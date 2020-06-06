import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PageHome from '../page-home';
import PageError from '../page-error';

import { cn } from '../../utils';
import { ROUTES } from '../../constants';

import './app.css';

// this root component is a 'routes wrapper' and generally intended for routes description
// all 'page*' components are 'containers/smart'-components (they should be connected to redux store)
@cn('app')
export default class App extends React.Component {
    getRenderFunction = {
        [ROUTES.HOME]() { return <PageHome /> },
        [ROUTES.NOT_FOUND]() { return <PageError /> }
    };

    render(cn) {
        return (
            <div className={ cn() } >
                <Switch>
                    <Route
                        exact={ true }
                        path='/'
                        render={ this.getRenderFunction[ROUTES.HOME] }
                    />
                    <Route
                        exact={ true }
                        path={ ROUTES.NOT_FOUND }
                        render={ this.getRenderFunction[ROUTES.NOT_FOUND] }
                    />
                    <Redirect from='*' to={ ROUTES.NOT_FOUND } />
                </Switch>
            </div>
        );
    }
}
