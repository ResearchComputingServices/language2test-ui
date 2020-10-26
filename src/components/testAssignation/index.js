import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import Form from './Form';
import { Layout, NotFound } from '../common';
import {
    useForm,
    useEffect,
    useFormData,
    useFormActions,
    useFormButtons,
    useFormLayout,
    useCallback,
} from '../../hooks';

function TestAssignation({ match }) {
    const entity = 'testAssignation';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const layout = useFormLayout(entity);
    const startDatetime = controls.watch('startDatetime');
    const endDatetime = controls.watch('endDatime');

    const {
        data,
        loading,
        error,
        setData,
    } = useFormData(entity, id);

    const actions = useFormActions(entity, 'test assignation');

    const checkDatetimeValidation = (startDatetime, endDatetime) => {
        if (_.isUndefined(startDatetime) && _.isUndefined(endDatetime)) {
            return true;
        }
        startDatetime = moment(startDatetime);
        endDatetime = moment(endDatetime);
        return startDatetime.isBefore(endDatetime);
    };

    const setError = useCallback(controls.setError, [controls.setError]);
    const clearError = useCallback(controls.clearError, [controls.clearError]);

    useEffect(() => {
        const isValid = checkDatetimeValidation(startDatetime, endDatetime);
        !isValid
            ? setError('customError', 'enoent', 'Start Date Time should not be after End Date Time')
            : clearError();
    }, [setError, clearError, startDatetime, endDatetime]);

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
            }
        },
    }, data.immutable, data.unremovable, true);

    const getForm = id => (
        !_.isNil(id) && _.isEmpty(data)
            ? <NotFound />
            : (
                <Form
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    layout={layout}
                    title={`${!_.isNil(id) ? 'Edit' : 'New'} Test Assignation`}
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

TestAssignation.propTypes = { match: PropTypes.object.isRequired };

export default TestAssignation;
