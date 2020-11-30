import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import clsx from 'clsx';

function TestDeveloperGridFilter({ className, style, onChange, options }) {
    return (
        <Autocomplete
            className={clsx(className, 'test-developer-dashboard-grid-filter')}
            getOptionLabel={option => option}
            onChange={onChange}
            options={options}
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
    options: PropTypes.array.isRequired,
};

TestDeveloperGridFilter.defaultProps = {
    className: '',
    style: undefined,
};

export default TestDeveloperGridFilter;
