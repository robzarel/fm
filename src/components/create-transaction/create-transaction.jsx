import React from 'react';
import propTypes from 'prop-types';

import { cn } from '../../utils';
import { TRANSACTION } from '../../constants';

import './create-transaction.css';

const dataByTransactionType = {
    [TRANSACTION.TYPES.EXPANSE]: {
        modifier: 'expanse',
        header: 'расход'
    },
    [TRANSACTION.TYPES.INCOME]: {
        modifier: 'income',
        header: 'доход'
    }
}


@cn('create-transaction')
class CreateTransaction extends React.Component {
    static propTypes = {
        type: propTypes.oneOf([TRANSACTION.TYPES.EXPANSE, TRANSACTION.TYPES.INCOME]).isRequired,
        onTransactionCreate: propTypes.func.isRequired
    };
    
    render(cn) {
        const { type } = this.props;
        const { header, modifier } = dataByTransactionType[type];

        return (
            <div className={ cn({ type: modifier }) }>
                <p>{ header }</p>
                <div>
                    <label htmlFor='transactionAmount'>сумма</label>
                    <input type='text' id='transactionAmount' />
                </div>
                <div>
                    <label htmlFor='transactionTimestamt'>дата</label>
                    <input type='text' id='transactionTimestamt' />
                </div>
            </div>
        );
    }
}

export default CreateTransaction ;
