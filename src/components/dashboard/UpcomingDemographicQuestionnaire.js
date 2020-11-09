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
    const userFieldTypeService = useService('userFieldType');

    useMount(async () => {
        // TODO Over here we actuall need to retrieve the special query that uses month.
        const enumerationFieldMap = _.reduce(await userFieldTypeService.get(), (accumulator, userFieldType) => {
            const enumerationValues = _.get(userFieldType, 'enumeration.values');
            if (_.isArray(enumerationValues)) {
                accumulator[userFieldType.name] = enumerationValues;
            }
            return accumulator;
        }, {});
        const fields = _.get(userSession, 'fields', []);
        const newLayout = [];
        const addedFields = [];
        const formData = {};
        _.each(fields, (field, index) => {
            const type = _.get(field, 'type');
            if (type in enumerationFieldMap) {
                newLayout.push({
                    field: `fields.${index}.${field.name}`,
                    type: 'picklist',
                    options: _.map(enumerationFieldMap[type], value => value.text),
                    title: _.split(field.name, '_')
                        .map(_.capitalize)
                        .join(' '),
                });
            } else {
                newLayout.push({
                    field: `fields.${index}.${field.name}`,
                    type: _.get(field, 'userFieldType.name'),
                    title: _.split(field.name, '_')
                        .map(_.capitalize)
                        .join(' '),
                });
            }
            formData[`fields.${index}.${field.name}`] = field.value;
            addedFields.push(field.name);
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
