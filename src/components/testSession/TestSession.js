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
    const rights = {
        create: ['Administrator'],
        update: ['Administrator'],
        delete: ['Administrator'],
        export: ['Administrator'],
    };
    const entity = 'testSession';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const {
        data,
        loading,
        error,
    } = useFormData(entity, id);

    const actions = _.omit(useFormActions(entity, 'past result'), ['download']);

    const buttons = useFormButtons(id, actions, rights, data.immutable, data.unremovable);

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
                            title='Past Result'
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
