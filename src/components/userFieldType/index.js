import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Layout, NotFound } from '../common';
import Form from './Form';
import {
    useForm,
    useFormData,
    useFormLayout,
    useFormActions,
    useFormButtons,
} from '../../hooks';

function UserFieldType({ match }) {
    const entity = 'userFieldType';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const layout = useFormLayout(entity);

    const {
        data,
        loading,
        error,
        setData,
    } = useFormData(entity, id);

    const actions = useFormActions(entity, 'user field type');

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

    const getForm = id => (
        !_.isNil(id) && _.isEmpty(data)
            ? <NotFound />
            : (
                <Form
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    layout={layout}
                    title={`${!_.isNil(id) ? 'Edit' : 'New'} User Field Type`}
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

UserFieldType.propTypes = { match: PropTypes.object.isRequired };

export default UserFieldType;
