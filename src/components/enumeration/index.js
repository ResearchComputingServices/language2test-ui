import React, { useState } from 'react';
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

function Enumeration({ match }) {
    const rights = {
        create: ['Administrator'],
        update: ['Administrator'],
        delete: ['Administrator'],
        export: ['Administrator'],
    };
    const entity = 'enumeration';
    const id = _.get(match, 'params.id');
    const animationTimeout = 300;

    const controls = useForm();
    const layout = useFormLayout(entity);
    const [values, setValues] = useState([]);

    const {
        data,
        loading,
        error,
        setData,
    } = useFormData(entity, id, data => {
        if (!_.isEmpty(data)) {
            setValues(_.map(data.values, value => ({ text: value.text })));
        }
    });

    const onValueAdd = newData => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!_.isEmpty(_.get(newData, 'text'))) {
                const data = [...values];
                data.push(newData);
                setValues(data);
                resolve();
            } else {
                reject();
            }
        }, animationTimeout);
    });

    const onValueUpdate = (newData, oldData) => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!_.isEmpty(oldData) && !_.isEmpty(_.get(newData, 'text'))) {
                const data = [...values];
                data[data.indexOf(oldData)] = newData;
                setValues(data);
                resolve();
            } else {
                reject();
            }
        }, animationTimeout);
    });

    const onValueDelete = oldData => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!_.isEmpty(oldData)) {
                const data = [...values];
                data.splice(data.indexOf(oldData), 1);
                setValues(data);
                resolve();
            } else {
                reject();
            }
        }, animationTimeout);
    });

    const actions = useFormActions(entity);

    const buttons = useFormButtons(id, entity, {
        ...actions,
        create: async data => {
            data.values = values;
            const result = await actions.create(data);
            if (!_.isNil(result)) {
                setData(result);
                actions.cancel();
            }
        },
        update: async data => {
            data.values = values;
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
                    onValueAdd={onValueAdd}
                    onValueDelete={onValueDelete}
                    onValueUpdate={onValueUpdate}
                    title={`${!_.isNil(id) ? 'Edit' : 'New'} Enumeration`}
                    values={values}
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

Enumeration.propTypes = { match: PropTypes.object.isRequired };

export default Enumeration;
