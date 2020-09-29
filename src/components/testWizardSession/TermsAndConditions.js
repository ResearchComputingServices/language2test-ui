import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';

const TermsAndConditions = ({ onChange }) => (
    <div className='test-wizard-session-content mt-5 text-muted'>
        Your responses to this test may be tracked and recorded for research purposes.
        <br />
        Your participation in this research study is voluntary.
        <br />
        <FormControlLabel
            className='my-4'
            control={<Checkbox color='primary' />}
            label='I agree to participate'
            onChange={onChange}
        />
    </div>
);

TermsAndConditions.propTypes = { onChange: PropTypes.func.isRequired };

export default TermsAndConditions;
