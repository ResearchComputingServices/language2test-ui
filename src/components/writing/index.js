import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Layout, NotFound } from '../common';
import Form from './Form';
import ImageUploader from '../imageUploader';
import {
    useForm,
    useFormData,
    useFormLayout,
    useFormActions,
    useFormButtons,
} from '../../hooks';

function Writing({ match }) {
    const entity = 'writing';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const { setValue, getValues, clearError, register, unregister } = controls;
    const layout = useFormLayout(entity);
    const [dynamicLayout, setDynamicLayout] = useState([]);

    // Registering a field that is hidden on the form.
    useEffect(() => {
        register({ name: 'filename' });
        return () => unregister('filename');
    }, [register, unregister]);

    const onImageUpload = async data => setValue('filename', data.name);

    const initialize = data => {
        clearError();
        data = _.isNil(data) ? getValues() : data;
        setValue('filename', _.get(data, 'filename'));
        const { type } = data;
        const dynamicLayout = [
            {
                field: 'type',
                title: 'Type',
                size: 'medium',
                type: 'picklist',
                options: [
                    'text',
                    'image',
                ],
                required: true,
                onChange: type => {
                    setValue('type', type);
                    initialize(getValues());
                },
            },
        ];
        if (_.eq(type, 'image')) {
            dynamicLayout.push({
                type: 'raw',
                content: (
                    <div className='field'>
                        <ImageUploader
                            imageName={getValues('filename')}
                            onUpload={onImageUpload}
                        />
                    </div>
                ),
            });
        }
        if (_.eq(type, 'text')) {
            dynamicLayout.push(
                {
                    field: 'question',
                    title: 'Requirement',
                    type: 'textarea',
                    required: true,
                },
            );
        }
        setDynamicLayout(dynamicLayout);
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
    });

    const getForm = id => (
        !_.isNil(id) && _.isEmpty(data)
            ? <NotFound />
            : (
                <Form
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    dynamicLayout={dynamicLayout}
                    layout={layout}
                    title={`${!_.isNil(id) ? 'Edit' : 'New'} Writing`}
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

Writing.propTypes = { match: PropTypes.object.isRequired };

export default Writing;
