import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import clsx from 'clsx';

function TestDeveloperGridFilter({ className, style, onChange }) {
    return (
        <Autocomplete
            className={clsx(className, 'test-developer-dashboard-grid-filter')}
            getOptionLabel={option => option}
            onChange={onChange}
            options={[
                'In Use (with a test session)',
                'Upcoming/Assigned',
                'Unused',
            ]}
            renderInput={params => (
                <TextField
                    {...params}
                    label='Filter Tests By'
                    variant='outlined'
                />
            )}
            style={style}
        />
    );
}

TestDeveloperGridFilter.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

TestDeveloperGridFilter.defaultProps = {
    className: '',
    style: undefined,
};

export default TestDeveloperGridFilter;
