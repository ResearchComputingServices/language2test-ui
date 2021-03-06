export default [
    {
        field: 'id',
        title: 'Id',
        filtering: false,
    },
    {
        field: 'name',
        title: 'Name',
        filtering: false,
    },
    {
        field: 'text',
        title: 'Reading',
        filtering: false,
    },
    {
        field: 'filename',
        title: 'Filename',
        filtering: false,
    },
    {
        field: 'timeLimit',
        title: 'Time Limit',
        filtering: false,
        range: { min: 1 },
    },
    {
        field: 'testCategory',
        title: 'Category',
        sorting: false,
    },
];
