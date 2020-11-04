import _ from 'lodash';
import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import VocabulariesGrid from '../../vocabularies/Grid';
import ReadingComprehensionsGrid from '../../readingComprehensions/Grid';
import ClozesGrid from '../../clozes/Grid';
import WritingsGrid from '../../writings/Grid';
import StudentsGrid from '../../students/Grid';
import StudentClassesGrid from '../../studentClasses/Grid';
import InstructorStudentClassesGrid from '../../instructorStudentClasses/Grid';

function formatDefaultValue(field) {
    const defaultValue = _.get(field, 'defaultValue');
    if (_.isNil(defaultValue)) {
        return [];
    }
    return defaultValue;
}

function getGrid(entity) {
    return {
        vocabularies: { Component: VocabulariesGrid },
        readingComprehensions: { Component: ReadingComprehensionsGrid },
        clozes: { Component: ClozesGrid },
        students: { Component: StudentsGrid },
        writings: { Component: WritingsGrid },
        studentClasses: { Component: StudentClassesGrid },
        instructorStudentClasses: { Component: InstructorStudentClassesGrid },
    }[entity];
}

function Field({ field, controls: { control, errors, getValues, setValue, watch, clearError } }) {
    // Watch is basically a useEffect hook that binds data of the form to the component.
    watch(field.field);
    const entity = _.get(field, 'entity');
    const onRowClick = _.get(field, 'onRowClick');
    const identifierKey = _.get(field, 'identifierKey', 'name');
    const grid = getGrid(entity);
    const { Component } = grid;
    const disabled = _.get(field, 'disabled');

    return (
        <div className='field'>
            <Controller
                {..._.omit(field, ['entity', 'onRowClick', 'identifierKey'])}
                as={<Autocomplete />}
                control={control}
                defaultValue={formatDefaultValue(field)}
                getOptionLabel={option => option[identifierKey]}
                getOptionSelected={(option, value) => _.eq(option[identifierKey], value[identifierKey])}
                multiple
                name={field.name}
                onChange={([, data]) => {
                    _.isFunction(field.onChange) && field.onChange(data);
                    return data;
                }}
                options={getValues(field.field) || []}
                renderInput={
                    params => (
                        <TextField
                            {...params}
                            disabled={field.disabled}
                            helperText={field.helperText}
                            label={field.label}
                            required={field.required}
                            variant={field.variant}
                        />
                    )
                }
                rules={{
                    required: field.required,
                    validate: data => !_.isEmpty(data) || '',
                }}
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
            <Component
                onRowClick={disabled
                    ? undefined
                    : (event, row) => {
                        if (field.field in errors) {
                            clearError(field.field);
                        }
                        const values = getValues(field.field) || [];
                        if (!_.some(values, v => _.isEqual(v, row))) {
                            values.push(row);
                            setValue(field.field, values);
                        }
                        if (_.isFunction(onRowClick)) {
                            onRowClick(row);
                        }
                    }}
            />
        </div>
    );
}
Field.propTypes = {
    field: PropTypes.object.isRequired,
    controls: PropTypes.object.isRequired,
};

export default Field;
