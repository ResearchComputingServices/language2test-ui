import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
    useForm,
    useFormData,
    useFormActions,
    useFormButtons,
} from '../../hooks';
import { Layout, NotFound } from '../common';
import Form from './Form';
import testSessionFormLayout from '../../config/formLayouts/testSessionFormLayout';
import TestSessionResults from '../testSessionResult';

function TestSession({ match }) {
    const entity = 'testSession';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const {
        data,
        loading,
        error,
    } = useFormData(entity, id);

    const actions = _.omit(useFormActions(entity, 'test session'), ['download']);

    const buttons = useFormButtons(id, entity, actions, data.immutable, data.unremovable);

    return (
        <Layout
            error={error}
            loading={loading}
            unmountOnLoad
        >
            {
                !_.isEmpty(data)
                    ? (
                        <Form
                            buttons={buttons}
                            controls={controls}
                            data={data}
                            layout={testSessionFormLayout}
                            title='Test Session'
                        >
                            <TestSessionResults data={data} />
                        </Form>
                    )
                    : <NotFound />
            }
        </Layout>
    );
}

TestSession.propTypes = { match: PropTypes.object.isRequired };

export default TestSession;
