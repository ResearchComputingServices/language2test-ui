import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Form from './Form';
import { Layout, NotFound } from '../common';
import {
    useForm,
    useFormData,
    useFormActions,
    useFormButtons,
    useFormLayout,
    useActions,
    useMount,
} from '../../hooks';

function InstructorStudentClass({ match }) {
    const rights = {
        create: ['Instructor'],
        update: ['Instructor'],
        delete: ['Instructor'],
        export: ['Instructor'],
    };
    const entity = 'studentClass';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const layout = useFormLayout('instructorStudentClass');
    const instructorStudentClassesActions = useActions('instructorStudentClasses');

    useMount(() => instructorStudentClassesActions.reset());

    const {
        data,
        loading,
        error,
        setData,
    } = useFormData(entity, id);

    const actions = useFormActions(entity, 'student class');

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

InstructorStudentClass.propTypes = { match: PropTypes.object.isRequired };

export default InstructorStudentClass;
