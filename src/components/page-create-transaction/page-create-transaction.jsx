import React from 'react';
import { connect } from 'react-redux';

import Wrapper from '../layout-wrapper';

import { cn } from '../../utils';

@cn('page-create-transaction')
class CreateTransaction extends React.Component {
    render(cn) {
        return (
            <Wrapper>
                <div className={ cn }>
                    <div>
                        <label htmlFor='transactionAmount'>сумма</label>
                        <input type='text' id='transactionAmount' />
                    </div>
                    <div>
                        <label htmlFor='transactionTimestamt'>дата</label>
                        <input type='text' id='transactionTimestamt' />
                    </div>
                </div>
            </Wrapper>
        );
    }
}


let mapStateToProps = state => ({ app: state.app });
let mapDispatchToProps = {};

export { CreateTransaction };
export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction);
