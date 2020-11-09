import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper } from '@material-ui/core';
import Form from '../form';
import { Button } from '../common';
import {
    useStore,
    useForm,
    useMount,
    useState,
    useService,
} from '../../hooks';

function UpcomingDemopgrahicQuestionnaire({ className }) {
    const controls = useForm();
    const [layout, setLayout] = useState([]);
    const userSession = useStore('userSession');
    const [data, setData] = useState({});
    const testTakerService = useService('testTaker');

    useMount(async () => {
        const newLayout = [];
        const formData = {};
        const fields = await testTakerService.getUpcomingDemographicQuestionnaires();
        _.each(fields, (field, index) => {
            const enumerationValues = _.get(field, 'userFieldType.enumeration.values');
            // If enumerationValues is an array we know the type field has enumertions associated with it. Enumerations are just lists.
            if (_.isArray(enumerationValues)) {
                newLayout.push({
                    field: `fields.${index}.${field.name}`,
                    type: 'picklist',
                    options: _.map(enumerationValues, value => value.text),
                    title: _.get(field, 'display')
                });
            } else {
                newLayout.push({
                    field: `fields.${index}.${field.name}`,
                    type: _.get(field, 'userFieldType.name'),
                    title: _.get(field, 'display') 
                });
            }
            formData[`fields.${index}.${field.name}`] = field.value;
            setData(formData);
        });
        setLayout(layout.concat(newLayout));
    });

    // eslint-disable-next-line
    const preProcessData = data => {
        // TODO All the fields that the user has is currently in UserSession.
        // We need to make sure that the no field is left behind from fields.
        // Any field in fields needs to be in the data.fields array, so we
        // have to add that back in.
        return data;
    };

    const updateProfile = () => {
        const data = preProcessData(controls.getValues({ nest: true }));
        _.defaults(data, userSession);
        console.log(data);
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
