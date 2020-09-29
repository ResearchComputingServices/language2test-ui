import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

const TestControls = ({
    onNextClick,
    onPreviousClick,
    disablePreviousBtn,
    disableNextBtn,
    nextButtonTitle,
    previousButtonTitle,
}) => (
    <div className='test-controls'>
        <Button
            className='test-controls-previous-btn'
            color='primary'
            disabled={disablePreviousBtn}
            onClick={onPreviousClick}
        >
            {previousButtonTitle}
        </Button>
        <Button
            className='test-controls-next-btn'
            color='primary'
            disabled={_.eq(disableNextBtn, true)}
            onClick={onNextClick}
        >
            { nextButtonTitle}
        </Button>
    </div>
);

TestControls.propTypes = {
    onNextClick: PropTypes.func.isRequired,
    onPreviousClick: PropTypes.func.isRequired,
    disablePreviousBtn: PropTypes.bool,
    disableNextBtn: PropTypes.bool,
    nextButtonTitle: PropTypes.string,
    previousButtonTitle: PropTypes.string,
};

TestControls.defaultProps = {
    disablePreviousBtn: false,
    disableNextBtn: false,
    nextButtonTitle: 'Next',
    previousButtonTitle: 'Previous',
};

export default TestControls;
