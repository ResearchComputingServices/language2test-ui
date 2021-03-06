import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Form from './Form';
import { Layout, NotFound } from '../common';
import {
    useForm,
    useMount,
    useActions,
    useFormData,
    useFormActions,
    useFormButtons,
    useFormLayout,
} from '../../hooks';

function StudentClass({ match }) {
    const rights = {
        create: ['Administrator', 'Instructor'],
        update: ['Administrator', 'Instructor'],
        delete: ['Administrator', 'Instructor'],
        export: ['Administrator', 'Instructor'],
    };
    const entity = 'studentClass';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const layout = useFormLayout(entity);

    const {
        data,
        loading,
        error,
        setData,
    } = useFormData(entity, id);

    const actions = useFormActions(entity, 'student class');
    const instructorStudentClassesActions = useActions('instructorStudentClasses');

    useMount(() => instructorStudentClassesActions.reset());

    const buttons = useFormButtons(id, {
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
            }
        },
    }, rights, data.immutable, data.unremovable);

    const getForm = id => (
        !_.isNil(id) && _.isEmpty(data)
            ? <NotFound />
            : (
                <Form
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    layout={layout}
                    title={`${!_.isNil(id) ? 'Edit' : 'New'} Student Class`}
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

StudentClass.propTypes = { match: PropTypes.object.isRequired };

export default StudentClass;
