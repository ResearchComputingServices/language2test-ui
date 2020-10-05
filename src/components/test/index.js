import React, { useState, useRef } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Form from './Form';
import { Layout, NotFound } from '../common';
import {
    useForm,
    useFormData,
    useFormLayout,
    useFormActions,
    useFormButtons,
} from '../../hooks';

function Test({ match }) {
    const entity = 'test';
    const id = _.get(match, 'params.id');
    const typeFields = {
        Vocabulary: {
            title: 'Vocabularies',
            entity: 'vocabularies',
            identifierKey: 'word',
        },
        'Reading Comprehension': {
            title: 'Reading Comprehensions',
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

    const getGridSelectField = (index, typeField) => ({
        ...typeField,
        field: `steps.${index}.values`,
        type: 'grid-select',
        required: true,
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

    const createStep = (index, type, layout, data) => {
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
            section.elements.push(getGridSelectField(index, typeField));
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

    const initialize = async data => {
        if (_.isNil(data)) {
            return configureDemographicQuestionnaireFields();
        }
        const layout = dynamicLayoutRef.current;
        _.each(data.steps, (step, index) => createStep(index, step.type, layout, data));
        setDynamicLayout([...layout]);
        setDynamicData(_.reduce(data.steps, (data, step, index) => {
            data[`steps.${index}.type`] = step.type;
            data[`steps.${index}.values`] = step.values;
            return data;
        }, {}));
        configureDemographicQuestionnaireFields(data);
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
    } = useFormData(entity, id, initialize);

    const actions = useFormActions(entity);

    const buttons = useFormButtons(id, entity, {
        ...actions,
        create: async data => {
            const result = await actions.create(data);
            if (!_.isNil(result)) {
                setData(result);
                actions.cancel();
            }
        },
        update: async data => {
            const result = await actions.update(data);
            if (!_.isNil(result)) {
                setData(result);
                actions.cancel();
            }
        },
    }, data.immutable, data.unremovable);

    const onClone = () => {
        alert('cloning...');
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
                    onClone={onClone}
                    onRemoveStep={removeStep}
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
