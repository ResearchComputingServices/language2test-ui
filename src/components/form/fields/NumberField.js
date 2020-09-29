import _ from 'lodash';
import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

function formatDefaultValue(field) {
    const defaultValue = _.get(field, 'defaultValue');
    if (_.isNil(defaultValue)) {
        return '';
    }
    return defaultValue;
}

function getRangeErrorMessage(label, min, max) {
    if (!_.isNil(max) && !_.isNil(min)) return `The field "${label}" exceeds maximum of "${max}" or is below minimum of "${min}"`;
    if (!_.isNil(max)) return `The field "${label}" exceeds maximum of "${max}"`;
    if (!_.isNil(min)) return `The field "${label}" is below minimum of "${min}"`;
}

function NumberField({ field, controls: { control, errors, getValues } }) {
    const maxLength = 10;
    const min = _.get(field, 'range.min');
    const max = _.get(field, 'range.max');
    const onChange = _.get(field, 'onChange');
    return (
        <div className='field'>
            <Controller
                {..._.omit(field, ['restrictRangeInput', 'range', 'onChange'])}
                as={(
                    <TextField
                        onInput={e => _.isFunction(onChange) && onChange(_.get(e, 'target.value'))}
                        type='number'
                    />
                )}
                control={control}
                defaultValue={formatDefaultValue(field)}
                rules={{
                    required: field.required,
                    maxLength,
                    validate: () => {
                        const stringValue = getValues(field.field);
                        const value = _.parseInt(stringValue);
                        if (_.parseInt(min) && value < min) {
                            return false;
                        }
                        if (_.parseInt(max) && value > max) {
                            return false;
                        }
                    },
                }}
            />
            {field.field in errors && _.eq(errors[field.field].type, 'maxLength') && (
                <div className='field-error'>
                    {`Exceeded maximum digit limit of "${maxLength}"`}
                </div>
            )}
            {field.field in errors && _.eq(errors[field.field].type, 'validate') && (
                <div className='field-error'>
                    {getRangeErrorMessage(field.label, min, max)}
                </div>
            )}
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

NumberField.propTypes = {
    field: PropTypes.object.isRequired,
    controls: PropTypes.object.isRequired,
};

export default NumberField;
