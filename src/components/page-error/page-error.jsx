import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header';
import { cn } from '../../utils';

const DEFAULT_PAGE_TITLE = 'Такой страницы не существует ;)';

@cn('page-error')
export default class PageError extends React.Component {
    static propTypes = {
        title: PropTypes.string
    };

    static defaultProps = {
        title: DEFAULT_PAGE_TITLE
    };

    render(cn) {
        const { title } = this.props;

        return (
            <div>
                <Header
                    className={ cn('header') }
                    title={ title }
                />
            </div>
        );
    }
}
