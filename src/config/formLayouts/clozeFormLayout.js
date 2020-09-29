import _ from 'lodash';

export default [
    {
        type: 'section',
        className: 'form-row',
        elements: [
            {
                field: 'id',
                title: 'Id',
                size: 'medium',
                disabled: data => !_.isNil(data.id),
                display: data => !_.isNil(data.id),
            },
            {
                field: 'name',
                title: 'Name',
                size: 'medium',
                disabled: data => !_.isNil(data.id),
                required: true,
            },
            {
                field: 'timeLimit',
                title: 'Time Limit',
                helperText: 'In seconds',
                type: 'number',
                size: 'medium',
                required: true,
                range: { min: 1 },
            },
        ],
    },
    {
        field: 'testCategory',
        title: 'Category',
        type: 'api-picklist',
        entity: 'testCategory',
        filter: data => _.eq(_.get(data, 'testType.name'), 'Cloze'),
        size: 'medium',
        required: true,
    },
];
