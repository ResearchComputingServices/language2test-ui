import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Layout, NotFound } from '../common';
import Form from './Form';
import {
    useForm,
    useFormData,
    useFormActions,
    useFormButtons,
    useFormLayout,
} from '../../hooks';

function TestCategory({ match }) {
    const entity = 'testCategory';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const layout = useFormLayout(entity);

    const {
        data,
        loading,
        error,
        setData,
    } = useFormData(entity, id);

    const actions = useFormActions(entity, 'test category');

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
                    layout={layout}
                    title={`${!_.isNil(id) ? 'Edit' : 'New'} Test Category`}
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

TestCategory.propTypes = { match: PropTypes.object.isRequired };

export default TestCategory;
