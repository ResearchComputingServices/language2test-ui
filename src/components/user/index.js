import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {
    useState,
    useEffect,
    useCallback,
} from 'react';
import {
    useRef,
    useForm,
    useStore,
    useActions,
    useService,
    useFormData,
    useFormLayout,
    useFormActions,
    useFormButtons,
} from '../../hooks';
import { Layout, NotFound } from '../common';
import Form from './Form';

function User({ match }) {
    const rights = {
        create: ['Administrator'],
        update: ['Administrator'],
        delete: ['Administrator'],
        export: ['Administrator'],
    };
    const entity = 'user';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const userSession = useStore('userSession');
    const { assignUserSession } = useActions('userSession');
    const layout = useFormLayout(entity);
    const roles = controls.watch('roles');
    const userFieldTypeService = useService('userFieldType');
    const [dynamicForm, setDynamicForm] = useState({
        layout: [],
        data: {},
        addedFields: [],
    });
    const [disableAddDemographicField, setDisableAddDemographicField] = useState(true);
    const typeMapRef = useRef({});

    const watchedSelectedDemographicField = controls.watch('selectedDemographicField');

    useEffect(() => {
        _.isNil(watchedSelectedDemographicField)
            ? setDisableAddDemographicField(true)
            : setDisableAddDemographicField(false);
    }, [watchedSelectedDemographicField]);

    const {
        data,
        loading,
        error,
        setData,
    } = useFormData(entity, id, async data => {
        // TODO - This form already retrieves userFieldTypes from the api-picklist field,
        // so doing it again within the view is basically pulling the data twice.
        const enumerationFieldMap = _.reduce(await userFieldTypeService.get(), (accumulator, userFieldType) => {
            const enumerationValues = _.get(userFieldType, 'enumeration.values');
            if (_.isArray(enumerationValues)) {
                accumulator[userFieldType.name] = enumerationValues;
            }
            return accumulator;
        }, {});
        const fields = _.get(data, 'fields', []);
        const layout = [];
        const addedFields = [];
        const formData = {};
        _.each(fields, (field, index) => {
            const type = _.get(field, 'type');
            typeMapRef.current[field.name] = type;
            if (type in enumerationFieldMap) {
                layout.push({
                    field: `fields.${index}.${field.name}`,
                    type: 'picklist',
                    options: _.map(enumerationFieldMap[type], value => value.text),
                    title: _.split(field.name, '_')
                        .map(_.capitalize)
                        .join(' '),
                });
            } else {
                layout.push({
                    field: `fields.${index}.${field.name}`,
                    type: _.get(field, 'userFieldType.name'),
                    title: _.split(field.name, '_')
                        .map(_.capitalize)
                        .join(' '),
                });
            }
            formData[`fields.${index}.${field.name}`] = field.value;
            addedFields.push(field.name);
        });
        setDynamicForm({
            layout,
            addedFields,
            data: formData,
        });
    });

    const isAdminUser = useCallback(() => _.eq(data.name, 'admin'), [data.name]);
    const setError = useCallback(controls.setError, [controls.setError]);
    const clearError = useCallback(controls.clearError, [controls.clearError]);

    useEffect(() => {
        const rolesToCheck = roles;
        if (!_.isNil(rolesToCheck) && isAdminUser()) {
            const hasAdministratorRole = rolesToCheck.some(role => _.eq(role.name, 'Administrator'));
            if (!hasAdministratorRole) {
                setError('customError', 'enoent', 'Cannot remove the "Administrator" role from the "admin" user');
            } else {
                clearError();
            }
        }
    }, [
        roles,
        isAdminUser,
        setError,
        clearError,
    ]);

    const preProcessData = data => {
        if (!_.isEmpty(data.fields) && !_.isNil(data.fields)) {
            const fields = [];
            _.each(data.fields, data => {
                const keys = _.keys(data);
                const values = _.values(data);
                const name = _.first(keys);
                const value = _.first(values);
                if (!_.isNil(value) && !_.isEmpty(value)) {
                    fields.push({
                        name,
                        value,
                        type: typeMapRef.current[name],
                    });
                }
            });
            data.fields = fields;
        }
        return data;
    };

    const onAddDemographicField = () => {
        const data = controls.getValues('selectedDemographicField');
        const layout = _.cloneDeep(dynamicForm.layout);
        const formData = _.cloneDeep(dynamicForm.data);
        const field = `fields.${layout.length}.${data.name}`;
        const enumerationValues = _.get(data, 'userFieldType.enumeration.values');
        typeMapRef.current[data.name] = _.get(data, 'userFieldType.enumeration.name');
        if (_.isArray(enumerationValues)) {
            layout.push({
                field,
                type: 'picklist',
                options: _.map(enumerationValues, value => value.text),
                title: _.split(data.name, '_')
                    .map(_.capitalize)
                    .join(' '),
            });
        } else {
            layout.push({
                field,
                type: _.get(data, 'userFieldType.name'),
                title: _.split(data.name, '_')
                    .map(_.capitalize)
                    .join(' '),
            });
        }
        formData[field] = '';
        setDynamicForm({
            ...dynamicForm,
            layout,
            data: formData,
            addedFields: [...dynamicForm.addedFields, data.name],
        });
        controls.setValue('selectedDemographicField', null);
    };

    const selectedDemographicFieldsFilter = data => !_.some(dynamicForm.addedFields, field => _.eq(field, data.name));

    const userInUsersession = data => {
        const { name } = userSession;
        return _.eq(data.name, name);
    };

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload();
        }, 800);
    };

    const actions = useFormActions(entity);

    const buttons = useFormButtons(id, entity, {
        ...actions,
        create: async data => {
            const result = await actions.create(preProcessData(data));
            if (!_.isNil(result)) {
                setData(result);
                actions.cancel();
                if (userInUsersession(data)) {
                    refreshPage();
                }
            }
        },
        update: async data => {
            const result = await actions.update(preProcessData(data));
            if (!_.isNil(result)) {
                setData(result);
                if (_.eq(data.id, userSession.id)) {
                    assignUserSession(data);
                }
                if (userInUsersession(data)) {
                    refreshPage();
                }
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
                    disableAddDemographicField={disableAddDemographicField}
                    dynamicData={dynamicForm.data}
                    dynamicLayout={dynamicForm.layout}
                    layout={layout}
                    onAddDemographicField={onAddDemographicField}
                    selectedDemographicFieldsFilter={selectedDemographicFieldsFilter}
                    title={`${!_.isNil(id) ? 'Edit' : 'New'} User`}
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

User.propTypes = { match: PropTypes.object.isRequired };

export default User;
