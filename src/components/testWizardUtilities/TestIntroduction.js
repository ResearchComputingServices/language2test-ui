import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const propTypes = {
    onStartClick: PropTypes.func.isRequired,
    introductionText: PropTypes.string.isRequired,
    buttonTitle: PropTypes.string.isRequired,
};

const TestIntroduction = ({ introductionText, buttonTitle, onStartClick }) => (
    <div className='test-introduction'>
        <h5 className='pb-4'>
            {introductionText}
        </h5>
        <Button
            className='test-introduction-start-btn'
            color='primary'
            onClick={onStartClick}
            variant='contained'
        >
            {buttonTitle}
        </Button>
    </div>
);

TestIntroduction.propTypes = propTypes;

export default TestIntroduction;
