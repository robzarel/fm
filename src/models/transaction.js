import propTypes from 'prop-types';
import { TRANSACTION, COUNTS_TYPES } from '../constants';

const TRANSACTION_MODEL = propTypes.shape({
    timestamp: propTypes.string.isRequired,
    amount: propTypes.number.isRequired,
    description: propTypes.string.isRequired,
    category: propTypes.oneOf(TRANSACTION.CATEGORIES),
    countType: propTypes.oneOf(COUNTS_TYPES),
    transactionType: propTypes.oneOf(TRANSACTION.TYPES.INCOME, TRANSACTION.TYPES.EXPANSE)
});

export default TRANSACTION_MODEL;
