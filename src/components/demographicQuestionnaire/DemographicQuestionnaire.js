import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { ToastsStore } from 'react-toasts';
import QuestionnaireForm from './QuestionnaireForm';
import { useActions, useStore, useService, useForm, useFormLayout, useMount } from '../../hooks';

export default function DemographicQuestionnaire() {
    const controls = useForm();
    const { errors } = controls;
    const service = useService('user');
    const user = useStore('userSession');
    const { assignUserSession } = useActions('userSession');
    const { validateStep, invalidateStep } = useActions('testWizardSession');
    const { wizardSteps: steps } = useStore('testWizardSession');
    const layout = useFormLayout('demographicQuestionnaire');
    const [dynamicForm, setDynamicForm] = useState({
        layout: [],
        data: {},
    });
    const { fields, mandatoryFields } = _.first(steps);

    const validateMandatoryFields = user => {
        const userFieldsMap = _.reduce(user.fields, (accumulator, field) => {
            accumulator[field.name] = field.value;
            return accumulator;
        }, {});
        return _.every(mandatoryFields, (value, key) => {
            const fieldValue = userFieldsMap[key];
            return !_.isNil(fieldValue);
        });
    };

    useMount(() => {
        setDynamicForm({
            layout: _.map(fields, (field, index) => {
                const enumerationValues = _.get(field, 'userFieldType.enumeration.values');
                // If enumerationValues is an array we know the type field has enumertions associated with it. Enumerations are just lists.
                if (_.isArray(enumerationValues)) {
                    return ({
                        field: `fields.${index}.${field.name}`,
                        type: 'picklist',
                        options: _.map(enumerationValues, value => value.text),
                        title: field.display,
                        required: field.name in mandatoryFields,
                    });
                }
                return ({
                    field: `fields.${index}.${field.name}`,
                    type: _.get(field, 'userFieldType.name'),
                    title: field.display,
                    required: field.name in mandatoryFields,
                });
            }),
            data: _.reduce(fields, (accumulator, field, index) => {
                const f = _.find(user.fields, f => _.eq(field.name, f.name));
                accumulator[`fields.${index}.${field.name}`] = _.get(f, 'value');
                return accumulator;
            }, {}),
        });
        if (validateMandatoryFields(user)) {
            validateStep(0);
        }
    });

    useEffect(() => {
        if (!_.isEmpty(errors)) {
            invalidateStep(0);
        }
    }, [errors, invalidateStep]);

    const preProcessData = data => {
        const fieldsMap = _.reduce(fields, (accumulator, field) => {
            accumulator[field.name] = field;
            return accumulator;
        }, {});
        if (_.isNil(data.fields)) {
            data.fields = [];
        }
        data.roles = user.roles;
        data.fields = _.map(data.fields, field => {
            const value = _.first(_.values(field));
            const name = _.first(_.keys(field));
            const preDefinedField = fieldsMap[name];
            const type = _.get(preDefinedField, 'userFieldType.name');
            return {
                name,
                value,
                type,
            };
        });
        const dataFieldsMap = _.reduce(data.fields, (accumulator, field) => {
            accumulator[field.name] = field.value;
            return accumulator;
        }, {});
        _.each(user.fields, field => {
            if (!_.isNil(field.name) && !(field.name in dataFieldsMap)) {
                const preDefinedField = fieldsMap[field.name];
                const type = _.get(preDefinedField, 'userFieldType.name');
                data.fields.push({
                    name: field.name,
                    value: field.value,
                    type,
                });
            }
        });
        return data;
    };

    const onSubmit = async data => {
        try {
            assignUserSession(await service.updateDemographicQuestionnaire(preProcessData(data)));
            if (!steps[0].valid && _.isEmpty(errors)) {
                validateStep(0);
            }
            ToastsStore.success('Completed Demographic Questionnaire');
        } catch (err) {
            ToastsStore.error('Failed to save your demographic information');
        }
    };

    return (
        <QuestionnaireForm
            controls={controls}
            data={user}
            dynamicData={dynamicForm.data}
            dynamicLayout={dynamicForm.layout}
            layout={layout}
            onSubmit={onSubmit}
        />
    );
}
