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
        field: 'question',
        title: 'Question',
        filtering: false,
    },
    {
        field: 'wordLimit',
        title: 'Word Limit',
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
    {
        field: 'filename',
        title: 'Filename',
    },
];
