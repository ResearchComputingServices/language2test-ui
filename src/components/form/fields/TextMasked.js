import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import _ from 'lodash';

function formatDefaultValue(field) {
    const defaultValue = _.get(field, 'defaultValue');
    if (_.isNil(defaultValue)) {
        return '';
    }
    return defaultValue;
}

function TextMasked({ field, controls: { control, errors } }) {
    return (
        <div className='field'>
            <Controller
                {...field}
                as={(
                    <InputMask>
                        {
                            () => (
                                <TextField
                                    label={field.title}
                                    variant={field.variant}
                                    {..._.pick(field, ['fullWidth', 'size', 'className', 'required'])}
                                />
                            )
                        }
                    </InputMask>
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

TextMasked.propTypes = {
    field: PropTypes.object.isRequired,
    controls: PropTypes.object.isRequired,
};

export default TextMasked;
