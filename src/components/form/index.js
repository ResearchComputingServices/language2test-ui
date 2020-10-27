import _ from 'lodash';
import React, { useEffect } from 'react';
import { ToastsStore } from 'react-toasts';
import PropTypes from 'prop-types';
import MomentFnsUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Button } from '../common';
import getFields from './config';

function createForm(elements, index, layout, data, controls, readonly) {
    const fields = getFields(controls);
    _.each(layout, field => {
        ++index;
        if (!field) return;
        if (_.isFunction(field.displayRule) && !(field.displayRule(data, controls.getValues))) return;
        const { getValues } = controls;
        field.defaultValue = !_.isEmpty(data) ? data[field.field] : undefined;
        field.disabled = _.isFunction(field.disabled) ? field.disabled(data, getValues) : field.disabled;
        if (_.isFunction(field.display)) {
            if (_.eq(field.display(data, getValues), false)) return;
            delete field.display;
        }
        let type;
        if (field.type in fields || _.eq(field.type, 'section')) {
            type = field.type;
        } else if (_.isNil(field.type)) {
            type = 'text';
        } else {
            throw new Error(`Unknown field type "${field.type}", check your form layout.`);
        }
        if (_.eq(type, 'section')) {
            if (!('elements' in field)) {
                throw new Error('Every section must contain elements, check your form layout.');
            }
            const innerElements = [];
            const newIndex = createForm(innerElements, index, field.elements, data, controls, readonly);
            const groupProps = _.pick(field, ['className', 'style']);
            elements.push((
                <div
                    {...groupProps}
                    key={newIndex}
                >
                    {innerElements}
                </div>
            ));
            index = newIndex + 1;
        } else {
            const clonedField = { ...field };
            const label = clonedField.title;
            const name = clonedField.field;
            clonedField.variant = clonedField.variant || 'outlined';
            delete clonedField.label;
            delete clonedField.name;
            delete clonedField.displayRule;
            if (readonly) {
                clonedField.disabled = true;
            }
            const element = fields[type](index, {
                ...clonedField,
                name,
                label,
                fullWidth: clonedField.fullWidth || _.isNil(clonedField.size),
            });
            elements.push(element);
        }
    });

    return index;
}

function FormSection({ index, append, prepend, layout, data, controls, readonly }) {
    const elements = [];
    createForm(elements, index, layout, data, controls, readonly);
    return (
        <>
            {prepend}
            {elements}
            {append}
        </>
    );
}

function createCustomError(errors) {
    if (_.has(errors, 'customError')) {
        const messages = _.get(errors, 'customError.message');
        if (_.isArray(messages)) {
            return _.map(messages, (errorMessage, index) => (
                <div
                    key={index}
                    className='form-custom-error'
                >
                    {errorMessage}
                </div>
            ));
        }
        return <div className='form-custom-error'>{messages}</div>;
    }
    return null;
}

function Form({ controls, data, layout, sections, buttons, readonly }) {
    const elements = [];
    const index = createForm(elements, 0, layout, data, controls, readonly);
    const getHandler = handler => (_.isFunction(handler) ? handler : _.noop);

    // If there are any form errors we immediately notify the user indicating an error via toast message.
    useEffect(() => {
        if (!_.isEmpty(controls.errors)) {
            ToastsStore.error('Failed to save, please double check the form');
        }
    }, [controls.errors]);

    return (
        <div id='generated-form'>
            {createCustomError(controls.errors)}
            <MuiPickersUtilsProvider utils={MomentFnsUtils}>
                {elements}
            </MuiPickersUtilsProvider>
            {_.map(sections, (field, i) => {
                field = { ...field, controls };
                return (
                    <FormSection
                        key={i}
                        index={index}
                        {...field}
                    />
                );
            })}
            <div>
                {_.chain(buttons)
                    .compact()
                    .map(
                        ({ handler, title, type, disabled }, i) => (
                            <Button
                                key={i}
                                className='form-button'
                                color='primary'
                                disabled={
                                    !_.isNil(disabled)
                                        ? (!_.isEmpty(controls.errors) || disabled)
                                        : !_.isEmpty(controls.errors) && !_.eq(type, 'utility')
                                }
                                onClick={!_.eq(type, 'utility')
                                    ? controls.handleSubmit(getHandler(handler))
                                    : getHandler(handler)}
                                variant='contained'
                            >
                                {title || ''}
                            </Button>
                        ),
                    )
                    .value()}
            </div>
        </div>
    );
}

FormSection.propTypes = {
    index: PropTypes.number.isRequired,
    append: PropTypes.node,
    prepend: PropTypes.node,
    controls: PropTypes.object.isRequired,
    data: PropTypes.object,
    layout: PropTypes.array.isRequired,
    readonly: PropTypes.bool,
};

FormSection.defaultProps = {
    data: {},
    append: null,
    prepend: null,
    readonly: false,
};

Form.propTypes = {
    controls: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    layout: PropTypes.array.isRequired,
    sections: PropTypes.array,
    buttons: PropTypes.array,
    readonly: PropTypes.bool,
};

Form.defaultProps = {
    sections: [],
    buttons: [],
    readonly: false,
};

export default Form;
