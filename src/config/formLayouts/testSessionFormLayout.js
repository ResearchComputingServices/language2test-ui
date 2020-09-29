import _ from 'lodash';

export default [
    {
        type: 'section',
        className: 'form-row',
        elements: [
            {
                field: 'id',
                title: 'Id',
                type: 'number',
                size: 'medium',
                required: true,
                disabled: data => !_.isNil(data.id),
                display: data => !_.isNil(data.id),
            },
            {
                field: 'name',
                title: 'Name',
                required: true,
                disabled: true,
                size: 'medium',
            },
        ],
    },
    {
        field: 'test',
        title: 'Test Name',
        type: 'api-picklist',
        entity: 'test',
        disabled: true,
        required: true,
    },
    {
        field: 'user',
        title: 'Student Username',
        type: 'api-picklist',
        entity: 'student',
        disabled: true,
        required: true,
    },
    {
        field: 'startDatetime',
        title: 'Start',
        type: 'datetime',
        disabled: true,
    },
    {
        field: 'endDatetime',
        title: 'Ended',
        type: 'datetime',
        disabled: true,
    },
    {
        field: 'createdDatetime',
        title: 'Created',
        type: 'datetime',
        disabled: true,
    },
];
