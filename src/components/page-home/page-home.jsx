import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../header';

import { cn } from '../../utils';

const DEFAULT_PAGE_TITLE = 'home page';

@cn('page-home')
class Home extends React.Component {
    static propTypes = {
        title: PropTypes.string
    };

    static defaultProps = {
        title: DEFAULT_PAGE_TITLE
    };

    render(cn) {
        const { title } = this.props;

        return (
            <div className={ cn }>
                <Header
                    className={ cn('header') }
                    title={ title }
                />
            </div>
        );
    }
}


let mapStateToProps = state => ({ app: state.app });
let mapDispatchToProps = {};

export { Home };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
