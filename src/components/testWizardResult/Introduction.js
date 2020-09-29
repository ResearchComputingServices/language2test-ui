import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const Introduction = ({ introductionText, buttonTitle, onEvaluateClick }) => (
    <div className='test-wizard-result-introduction'>
        <h5 className='pb-4'>
            {introductionText}
        </h5>
        <Button
            className='test-wizard-result-start-btn'
            color='primary'
            onClick={onEvaluateClick}
            variant='contained'
        >
            {buttonTitle}
        </Button>
    </div>
);
Introduction.propTypes = {
    onEvaluateClick: PropTypes.func.isRequired,
    introductionText: PropTypes.string.isRequired,
    buttonTitle: PropTypes.string.isRequired,
};

export default Introduction;
