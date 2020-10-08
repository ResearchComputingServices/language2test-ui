import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Layout, NotFound } from '../common';
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
} from '../../hooks';

function Vocabulary({ match }) {
    const entity = 'vocabulary';
    const id = _.get(match, 'params.id');
    const layout = useFormLayout(entity);
    const controls = useForm();
    const cloneStore = useStore('clone');
    const cloneActions = useActions('clone');
    const historyService = useService('history');
    const [getClone, setClone] = useRefState(false);

    const {
        data,
        loading,
        error,
        setData,
    } = useFormData(entity, id, () => {
        if (_.isNil(id)) {
            const initializationData = _.omit(cloneStore.data, ['id', 'word']);
            cloneActions.reset();
            controls.reset(initializationData);
            setClone(true);
        }
    });

    const actions = useFormActions(entity);

    const buttons = useFormButtons(id, entity, {
        ...actions,
        create: async data => {
            const result = await actions.create(data);
            if (!_.isNil(result)) {
                setData(result);
                getClone() ? historyService.go('/admin/vocabularies') : actions.cancel();
            }
        },
        update: async data => {
            const result = await actions.update(data);
            if (!_.isNil(result)) {
                setData(result);
            }
        },
    }, data.immutable, data.unremovable);

    const onClone = () => {
        cloneActions.setData(controls.getValues());
        historyService.go('/admin/vocabularies/vocabulary');
    };

    const getForm = id => (
        !_.isNil(id) && _.isEmpty(data)
            ? <NotFound />
            : (
                <Form
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    layout={layout}
                    onClone={!getClone() ? onClone : undefined}
                    title={`${!_.isNil(id) ? 'Edit' : 'New'} Vocabulary`}
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

Vocabulary.propTypes = { match: PropTypes.object.isRequired };

export default Vocabulary;
