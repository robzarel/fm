import React from "react";
import PropTypes from 'prop-types';

import { cn } from '../../utils';

@cn("header")
export default class Header extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.node
    };

    render(cn) {
        const { title, icon } = this.props;

        return (
            <h3 className={ cn() }>{ title } <span>{ icon }</span></h3>
        );
    }
}
