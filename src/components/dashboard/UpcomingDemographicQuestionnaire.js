import _ from 'lodash';
import { ToastsStore } from 'react-toasts';
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper } from '@material-ui/core';
import Form from '../form';
import { Button } from '../common';
import {
    useStore,
    useActions,
    useForm,
    useMount,
    useState,
    useService,
} from '../../hooks';

function UpcomingDemopgrahicQuestionnaire({ className }) {
    const controls = useForm();
    const [layout, setLayout] = useState([]);
    const userSession = useStore('userSession');
    const userSessionActions = useActions('userSession');
    const [data, setData] = useState({});
    const [testTakerService, userService] = useService('testTaker', 'user');

    useMount(async () => {
        const newLayout = [];
        const formData = {};
        const existingFieldsMap = {};
        const fields = await testTakerService.getUpcomingDemographicQuestionnaires();
        _.each(userSession.fields, field => (existingFieldsMap[field.name] = field.value));
        _.each(fields, (field, index) => {
            const enumerationValues = _.get(field, 'userFieldType.enumeration.values');
            // If enumerationValues is an array we know the type field has enumertions associated with it. Enumerations are just lists.
            if (_.isArray(enumerationValues)) {
                newLayout.push({
                    field: `fields.${index}.${field.name}`,
                    type: 'picklist',
                    options: _.map(enumerationValues, value => value.text),
                    title: _.get(field, 'display'),
                });
            } else {
                newLayout.push({
                    field: `fields.${index}.${field.name}`,
                    type: _.get(field, 'userFieldType.name'),
                    title: _.get(field, 'display'),
                });
            }
            formData[`fields.${index}.${field.name}`] = existingFieldsMap[field.name];
            setData(formData);
        });
        setLayout(layout.concat(newLayout));
    });

    const preProcessData = data => {
        _.defaults(data, userSession);
        data.fields = _.map(data.fields, field => {
            const name = _.first(_.keys(field));
            const value = _.first(_.values(field));
            return {
                name,
                value,
            };
        });
        return data;
    };

    const updateProfile = async () => {
        const data = preProcessData(controls.getValues({ nest: true }));
        try {
            const responseData = await userService.updateDemographicQuestionnaire(data);
            userSessionActions.assignUserSession(responseData);
            ToastsStore.success('Successfully updated demopgrahic questionnaire');
        } catch (err) {
            ToastsStore.error('Failed to update demographic questionnaire');
        }
    };

    return (
        <Paper
            className={`${className} p-3 upcoming-demographic-questionnaire`}
            elevation={3}
        >
            <div className='pl-2 pb-3 upcoming-demographic-questionnaire-header'>
                <Typography variant='h6'>
                    Upcoming Questionnaires
                </Typography>
                <Button
                    color='primary'
                    onClick={updateProfile}
                    size='small'
                >
                    Save
                </Button>
            </div>
            {!_.isEmpty(data)
                ? (
                    <Form
                        controls={controls}
                        data={data}
                        layout={layout}
                    />
                )
                : <p className='h-75 center'>No upcoming questions</p>}
        </Paper>
    );
}

UpcomingDemopgrahicQuestionnaire.propTypes = { className: PropTypes.string };

UpcomingDemopgrahicQuestionnaire.defaultProps = { className: '' };

export default UpcomingDemopgrahicQuestionnaire;
