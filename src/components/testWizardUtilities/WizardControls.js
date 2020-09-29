import React from 'react';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';

const WizardControls = ({ handleBack, handleNext, disableNext, disablePrevious }) => (
    <div className='test-wizard-controls'>
        <Button
            color='primary'
            disabled={disablePrevious}
            onClick={handleBack}
        >
            <KeyboardArrowLeft />
            Previous Step
        </Button>
        <Button
            color='primary'
            disabled={disableNext}
            onClick={handleNext}
        >
            Next Step
            <KeyboardArrowRight />
        </Button>
    </div>
);

WizardControls.propTypes = {
    handleBack: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    disableNext: PropTypes.bool.isRequired,
    disablePrevious: PropTypes.bool.isRequired,
};

export default WizardControls;
