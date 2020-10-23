import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const SubmitTest = ({ error, onClick }) => (
    <div className='test-wizard-result-submit-test'>
        <h5 className='pb-4'>
            {error
                ? 'An error has occured and your test has not been saved, please resubmit your test.'
                : 'Submit your test scores to be evaluated.'}
        </h5>
        <Button
            className='test-wizard-result-submit-test-btn'
            color='primary'
            onClick={onClick}
            variant='contained'
        >
            {error ? 'Resubmit Test' : 'Submit Test'}
        </Button>
    </div>
);
SubmitTest.propTypes = {
    onClick: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
};

export default SubmitTest;
