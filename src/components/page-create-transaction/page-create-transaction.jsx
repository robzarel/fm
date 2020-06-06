import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Wrapper from '../layout-wrapper';
import CreateTransaction from '../create-transaction';
import { cn } from '../../utils';
import { TRANSACTION } from '../../constants';

@cn('page-create-transaction')
class CreateTransactionPage extends React.Component {
    static propTypes = {
        type: propTypes.oneOf(TRANSACTION.TYPES)
    };

    state = {
        activeTransactionType: TRANSACTION.TYPES.EXPANSE
    };

    getTransactionTypeChangeHandler = (type) => (event) => {
        event.preventDefault();
        this.setState({ activeTransactionType: TRANSACTION.TYPES[type] })
    };

    handleTransactionCreate = (transactionData) => {
        console.log('transactionData', transactionData);
    };

    render(cn) {
        const { INCOME, EXPANSE } = TRANSACTION.TYPES;
        const { activeTransactionType } = this.state;
        return (
            <Wrapper>
                <div className={ cn }>
                    <button onClick={ this.getTransactionTypeChangeHandler(EXPANSE) }>
                        внести расход
                    </button>
                    <button onClick={ this.getTransactionTypeChangeHandler(INCOME) }>
                        внести доход
                    </button>
                    <div>
                        <CreateTransaction
                            type={ activeTransactionType }
                            onTransactionCreate={ this.handleTransactionCreate }
                        />
                    </div>
                </div>
            </Wrapper>
        );
    }
}


let mapStateToProps = state => ({ app: state.app });
let mapDispatchToProps = {};

export { CreateTransactionPage };
export default connect(mapStateToProps, mapDispatchToProps)(CreateTransactionPage);
