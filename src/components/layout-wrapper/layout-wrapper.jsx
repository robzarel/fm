import React from "react";
import propTypes from 'prop-types';
import { cn } from '../../utils';

@cn("layout-wrapper")
class LayoutWrapper extends React.Component {
    static propTypes = {
        children: propTypes.element.isRequired
    };

    render(cn) {
        return (
            <div className={ cn }>{ this.props.children }</div>
        );
    }
}

export default LayoutWrapper;
