import _ from 'lodash';

export default [
    {
        field: 'id',
        title: 'Id',
        disabled: data => !_.isNil(data.id),
        display: data => !_.isNil(data.id),
    },
    {
        type: 'section',
        className: 'form-row',
        elements: [
            {
                field: 'startDateTime',
                title: 'Start Date Time',
                type: 'datetime',
                required: true,
            },
            {
                field: 'endDateTime',
                title: 'End Date Time',
                type: 'datetime',
                required: true,
            },
        ],
    },
    {
        field: 'test',
        title: 'Test',
        type: 'api-picklist',
        entity: 'test',
        required: true,
    },
    {
        field: 'studentClasses',
        title: 'Student Classes',
        type: 'grid-select',
        entity: 'studentClasses',
        required: true,
    },
];
