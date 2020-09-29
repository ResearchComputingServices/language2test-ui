import _ from 'lodash';
import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

function formatDefaultValue(field) {
    const defaultValue = _.get(field, 'defaultValue');
    if (_.isNil(defaultValue)) {
        return '';
    }
    return defaultValue;
}

function Field({ field, controls: { control, errors }, children }) {
    return (
        <div className='field'>
            <Controller
                {...field}
                as={children}
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
Field.propTypes = {
    field: PropTypes.object.isRequired,
    controls: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
};

export default Field;
