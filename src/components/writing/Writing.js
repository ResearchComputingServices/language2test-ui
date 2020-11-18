import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Layout, NotFound, ImageUploader } from '../common';
import Form from './Form';
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
    useRolesCheckerService,
} from '../../hooks';

function Writing({ match }) {
    const rights = {
        create: ['Administrator', 'Test Developer'],
        update: ['Administrator', 'Test Developer'],
        delete: ['Administrator', 'Test Developer'],
        export: ['Administrator', 'Test Developer'],
    };
    const rolesCheckerService = useRolesCheckerService();
    const [isReadonly, setIsReadonly] = useState(false);
    const entity = 'writing';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const { setValue, getValues, clearError, register, unregister } = controls;
    const layout = useFormLayout(entity);
    const [dynamicLayout, setDynamicLayout] = useState([]);
    const cloneStore = useStore('clone');
    const cloneActions = useActions('clone');
    const historyService = useService('history');
    const [getClone, setClone] = useRefState(false);

    // Registering a field that is hidden on the form.
    useEffect(() => {
        register({ name: 'filename' });
        return () => unregister('filename');
    }, [register, unregister]);

    const onImageUpload = async data => setValue('filename', data.name);

    const {
        data,
        loading,
        error,
        setData,
    } = useFormData(entity, id, data => {
        const readonly = _.isObject(data) && (data.immutable
        || (
            rolesCheckerService.has('Instructor')
                && !rolesCheckerService.has('Administrator')
                && !rolesCheckerService.has('Test Developer')
        ));
        readonly && setIsReadonly(readonly);
        clearError();
        data = _.isNil(data) ? getValues() : data;
        setValue('filename', _.get(data, 'filename'));
        !readonly && setDynamicLayout([{
            type: 'raw',
            content: (
                <div className='field'>
                    <ImageUploader
                        imageName={getValues('filename')}
                        onUpload={onImageUpload}
                    />
                </div>
            ),
        }]);
        if (_.isNil(id)) {
            const initializationData = _.omit(cloneStore.data, ['id', 'name']);
            cloneActions.reset();
            controls.reset(initializationData);
            setClone(true);
        }
    });

    const actions = useFormActions(entity);

    const buttons = useFormButtons(id, {
        ...actions,
        create: async data => {
            const result = await actions.create(data);
            if (!_.isNil(result)) {
                setData(result);
                getClone() ? historyService.go('/writings') : actions.cancel();
            }
        },
        update: async data => {
            const result = await actions.update(data);
            if (!_.isNil(result)) {
                setData(result);
            }
        },
    }, rights, data.immutable, data.unremovable);

    const onClone = () => {
        cloneActions.setData(controls.getValues());
        historyService.go('/writings/writing');
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
                    dynamicLayout={dynamicLayout}
                    layout={layout}
                    onClone={getOnClone()}
                    readonly={isReadonly}
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
