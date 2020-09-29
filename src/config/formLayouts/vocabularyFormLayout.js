import _ from 'lodash';

export default [
    {
        field: 'id',
        title: 'Id',
        disabled: data => !_.isNil(data.id),
        display: data => !_.isNil(data.id),
    },
    {
        field: 'word',
        title: 'Word',
        disabled: data => !_.isNil(data.id),
        required: true,
    },
    {
        field: 'type',
        title: 'Type',
        type: 'picklist',
        // TODO this is hard coded for now but in the future it will be retrieved from the database.
        options: ['synonym'],
        required: true,
    },
    {
        field: 'testCategory',
        title: 'Category',
        type: 'api-picklist',
        entity: 'testCategory',
        filter: data => _.eq(_.get(data, 'testType.name'), 'Vocabulary'),
        size: 'medium',
        required: true,
    },
    {
        field: 'timeLimit',
        title: 'Time Limit',
        helperText: 'In seconds',
        type: 'number',
        required: true,
        range: { min: 1 },
    },
    {
        field: 'options',
        title: 'Options',
        type: 'array',
        required: true,
    },
    {
        field: 'correct',
        title: 'Correct Option Number',
        type: 'number',
        required: true,
    },
];
