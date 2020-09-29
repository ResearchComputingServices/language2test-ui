import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TestSelector = ({ tests, onStart, onChange, disableStart }) => (
    <div className='test-wizard-session-content'>
        <div className='text-muted mb-4 mt-3'>Please select your test</div>
        <Autocomplete
            fullWidth
            getOptionLabel={option => option.name}
            onChange={onChange}
            options={!_.isNil(tests) ? tests : []}
            renderInput={params => (
                <TextField
                    {...params}
                    label='Tests'
                    variant='outlined'
                />
            )}
        />
        <Button
            className='my-5'
            color='primary'
            disabled={disableStart}
            onClick={onStart}
            variant='contained'
        >
            Start Test
        </Button>
    </div>
);

TestSelector.propTypes = {
    tests: PropTypes.array.isRequired,
    onStart: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    disableStart: PropTypes.bool.isRequired,
};

export default TestSelector;
