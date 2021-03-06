import React, { useState, useRef } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Form from './Form';
import { Layout, NotFound } from '../common';
import {
    useForm,
    useStore,
    useActions,
    useService,
    useRefState,
    useFormData,
    useFormLayout,
    useFormActions,
    useFormButtons,
    useTestWizardActions,
    useRolesCheckerService,
} from '../../hooks';

function Test({ match }) {
    const [clonedFromId, setClonedFromId] = useState(null);
    const rights = {
        create: ['Administrator', 'Test Developer'],
        update: ['Administrator', 'Test Developer'],
        delete: ['Administrator', 'Test Developer'],
        export: ['Administrator', 'Test Developer'],
    };
    const entity = 'test';
    const id = _.get(match, 'params.id');
    const typeFields = {
        Vocabulary: {
            title: 'Vocabularies',
            entity: 'vocabularies',
            identifierKey: 'word',
        },
        'Reading': {
            title: 'Readings',
            entity: 'readingComprehensions',
            identifierKey: 'name',
        },
        Cloze: {
            title: 'Clozes',
            entity: 'clozes',
            identifierKey: 'name',
        },
        Writing: {
            title: 'Writings',
            entity: 'writings',
            identifierKey: 'name',
        },
    };
    const controls = useForm();
    const { getValues, setValue } = controls;
    const [layout, setLayout] = useState(useFormLayout(entity));
    const [disableFormActions, setDisableFormActions] = useState(_.isNil(id));
    const [disableRemoveStep, setDisableRemoveStep] = useState(true);
    const [dynamicLayout, setDynamicLayout] = useState([]);
    const [dynamicData, setDynamicData] = useState({});
    const cloneStore = useStore('clone');
    const cloneActions = useActions('clone');
    const historyService = useService('history');
    const [getClone, setClone] = useRefState(false);
    const storeActions = useTestWizardActions();
    const rolesCheckerService = useRolesCheckerService();
    const [isReadonly, setIsReadonly] = useState(false);
    const testWizardSessionPreviewActions = useActions('testWizardSessionPreview');

    const layoutRef = useRef();
    const dynamicDataRef = useRef();
    const dynamicLayoutRef = useRef();

    layoutRef.current = layout;
    dynamicDataRef.current = dynamicData;
    dynamicLayoutRef.current = dynamicLayout;

    const isFormActionsDisabled = data => {
        if (_.isEmpty(data)) {
            setDisableFormActions(true);
        } else {
            const formData = getValues({ nest: true });
            if (_.some(formData.steps, v => _.isEmpty(v.values))) {
                setDisableFormActions(true);
            } else {
                setDisableFormActions(false);
            }
        }
    };

    const getGridSelectField = (index, typeField, readonly = false) => ({
        ...typeField,
        field: `steps.${index}.values`,
        type: 'grid-select',
        required: true,
        disabled: readonly,
        onChange: isFormActionsDisabled,
        onRowClick: () => {
            controls.clearError();
            setDisableFormActions(false);
        },
    });

    const configureDemographicQuestionnaireFields = data => {
        setLayout([
            ..._.cloneDeep(layout),
            {
                field: 'testUserFieldCategory',
                title: 'Demographic Fields',
                type: 'api-picklist-multiple',
                entity: 'demographicQuestionnaireField',
                onChange: data => {
                    const formData = getValues({ nest: true });
                    formData.testUserFieldCategory = data;
                    const currentMandatoryFields = getValues('mandatoryTestUserFieldCategory');
                    setValue('mandatoryTestUserFieldCategory', _.intersectionBy(data, currentMandatoryFields, 'name'));
                    configureDemographicQuestionnaireFields(formData);
                },
            },
            {
                field: 'mandatoryTestUserFieldCategory',
                title: 'Mandatory Demographic Fields',
                type: 'picklist-multiple',
                options: () => _.get(data, 'testUserFieldCategory', []),
                getOptionLabel: option => option.display,
                getOptionSelected: (option, value) => _.eq(option.display, value.display),
            },
        ]);
    };

    const onTypeChange = (data, index) => {
        setDisableFormActions(true);
        const layout = dynamicLayoutRef.current;
        const { elements } = layout[index];
        const typeField = typeFields[data];
        const valuesField = `steps.${index}.values`;
        setValue(valuesField, []);
        layout[index].elements = [
            elements[0],
            elements[1],
        ];
        if (!_.isNil(typeField)) {
            layout[index].elements.push(getGridSelectField(index, typeField));
        }
        setDynamicData(d => ({
            ...d,
            [`steps.${index}.type`]: data,
        }));
        setDynamicLayout([...layout]);
    };

    const createStep = (index, type, layout, data, readonly = false) => {
        if (disableRemoveStep) {
            setDisableRemoveStep(false);
        }
        layout = layout || dynamicLayoutRef.current;
        data = data || dynamicData.current;
        const section = {
            type: 'section',
            elements: [
                {
                    type: 'raw',
                    content: <div className='test-form-step-title'>{`Step-${index + 1}`}</div>,
                },
                {
                    field: `steps.${index}.type`,
                    title: 'Type',
                    disabled: readonly,
                    type: 'picklist',
                    required: true,
                    onChange: data => onTypeChange(data, index),
                    disableClearable: true,
                    options: Object.keys(typeFields),
                },
            ],
        };
        if (type in typeFields) {
            const typeField = typeFields[type];
            section.elements.push(getGridSelectField(index, typeField, readonly));
            _.assign(data, {
                [`steps.${index}.type`]: type,
                [`steps.${index}.values`]: [],
            });
        }
        layout.push(section);
        return {
            layout,
            data,
        };
    };

    const addStep = () => {
        const { layout } = createStep(dynamicLayoutRef.current.length);
        setDynamicLayout([...layout]);
    };

    const removeStep = () => {
        const layout = dynamicLayoutRef.current;
        const index = layout.length - 1;
        layout.pop();
        const sectionData = { ...dynamicData };
        delete sectionData[`steps.${index}.type`];
        delete sectionData[`steps.${index}.values`];
        setDynamicData(sectionData);
        setDynamicLayout([...layout]);
        if (_.isEmpty(layout)) {
            setDisableRemoveStep(true);
            setDisableFormActions(true);
        } else {
            const formData = getValues({ nest: true });
            if (_.some(formData.steps, (v, i) => (!_.eq(i, index) ? _.isEmpty(v.values) : false))) {
                setDisableFormActions(true);
            } else {
                setDisableFormActions(false);
            }
        }
    };

    const {
        data,
        loading,
        error,
        setData,
    } = useFormData(entity, id, async data => {
        const readonly = _.isObject(data) && (data.immutable
        || (
            rolesCheckerService.has('Instructor')
                && !rolesCheckerService.has('Administrator')
                && !rolesCheckerService.has('Test Developer')
        ));
        setIsReadonly(readonly);
        if (_.isNil(id)) {
            const initializationData = _.omit(cloneStore.data, ['id', 'name']);
            initializationData.clonedFromId = _.get(cloneStore, 'data.id', null);
            setClonedFromId(_.get(cloneStore, 'data.id', null));
            cloneActions.reset();
            controls.reset(initializationData);
            setClone(true);
            const layout = dynamicLayoutRef.current;
            _.each(initializationData.steps, (step, index) => createStep(index, step.type, layout, data, readonly));
            setDynamicLayout([...layout]);
            setDynamicData(_.reduce(initializationData.steps, (data, step, index) => {
                initializationData[`steps.${index}.type`] = step.type;
                initializationData[`steps.${index}.values`] = step.values;
                return data;
            }, {}));
            return configureDemographicQuestionnaireFields(data);
        }
        if (_.isNil(data)) {
            return configureDemographicQuestionnaireFields();
        }
        const layout = dynamicLayoutRef.current;
        _.each(data.steps, (step, index) => createStep(index, step.type, layout, data, readonly));
        setDynamicLayout([...layout]);
        setDynamicData(_.reduce(data.steps, (data, step, index) => {
            data[`steps.${index}.type`] = step.type;
            data[`steps.${index}.values`] = step.values;
            return data;
        }, {}));
        configureDemographicQuestionnaireFields(data);
    });

    const actions = useFormActions(entity);

    const buttons = useFormButtons(id, {
        ...actions,
        create: async data => {
            data.clonedFromId = clonedFromId;
            const result = await actions.create(data);
            if (!_.isNil(result)) {
                setData(result);
                actions.cancel();
            }
        },
        update: async data => {
            data.clonedFromId = clonedFromId;
            const result = await actions.update(data);
            if (!_.isNil(result)) {
                setData(result);
            }
        },
    }, rights, data.immutable, data.unremovable);

    const onClone = () => {
        cloneActions.setData(controls.getValues({ nest: true }));
        historyService.go('/tests/test');
    };

    const onPreview = () => {
        testWizardSessionPreviewActions.resetTestWizardSession();
        const { steps, testUserFieldCategory, mandatoryTestUserFieldCategory } = getValues({ nest: true });
        const wizardSteps = [{
            type: 'demographicQuestionnaire',
            valid: _.isEmpty(mandatoryTestUserFieldCategory),
            fields: testUserFieldCategory,
            mandatoryFields: _.reduce(mandatoryTestUserFieldCategory, (accumulator, field) => {
                accumulator[field.name] = true;
                return accumulator;
            }, {}),
        }];
        _.each(steps, (step, index) => {
            const { type } = step;
            if (type) {
                const { values: questions } = step;
                step = {};
                step.type = _.camelCase(type);
                if (index !== 0) {
                    step.dependency = index;
                }
                wizardSteps.push(step);
                const action = storeActions[step.type];
                if (!_.isNil(action)) {
                    action.setQuestions(questions);
                }
            }
        });
        testWizardSessionPreviewActions.startTestWizardSession({
            id,
            wizardSteps,
        });
        historyService.go('/test/wizard/preview');
    };

    const getOnClone = () => {
        if (!rolesCheckerService.has(rights.create)) return;
        return !getClone() ? onClone : undefined;
    };

    const getForm = id => (
        !_.isNil(id) && _.isEmpty(data)
            ? <NotFound />
            : (
                <Form
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    disableFormActions={disableFormActions}
                    disableRemoveStep={disableRemoveStep}
                    dynamicData={dynamicDataRef.current}
                    dynamicLayout={dynamicLayoutRef.current}
                    layout={layoutRef.current}
                    onAddStep={addStep}
                    onClone={getOnClone()}
                    onPreview={onPreview}
                    onRemoveStep={removeStep}
                    readonly={isReadonly}
                    staticSteps={false}
                    title={`${!_.isNil(id) ? 'Edit' : 'New'} Test`}
                />
            ));

    return (
        <Layout
            error={error}
            loading={loading}
            unmountOnLoad
        >
            {getForm(id)}
        </Layout>
    );
}

Test.propTypes = { match: PropTypes.object.isRequired };

export default Test;
