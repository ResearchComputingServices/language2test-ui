import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import Check from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import _ from 'lodash';

function formatDefaultValue(field) {
    const defaultValue = _.get(field, 'defaultValue');
    if (_.isNil(defaultValue)) {
        return false;
    }
    return defaultValue;
}

function Checkbox({ field, controls: { control, errors } }) {
    return (
        <div className='field'>
            <Controller
                {..._.omit(field, ['key', 'className', 'fullWidth'])}
                as={(
                    <FormControlLabel control={<Check color='primary' />} />
                )}
                control={control}
                defaultValue={formatDefaultValue(field)}
                rules={{ required: field.required }}
            />
            {field.field in errors && (_.eq(_.get(errors, [field.field, 'type']), 'custom') ? (
                <div className='field-error'>
                    {errors[field.field].message}
                </div>
            ) : (
                <div className='field-error'>
                    The field &quot;
                    {field.label}
                    &quot; is Mandatory for save
                </div>
            ))}
        </div>
    );
}

Checkbox.propTypes = {
    field: PropTypes.object.isRequired,
    controls: PropTypes.object.isRequired,
};

export default Checkbox;
