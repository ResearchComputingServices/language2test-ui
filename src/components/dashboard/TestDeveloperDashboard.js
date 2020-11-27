import React from 'react';
import TestDeveloperGridFilter from './TestDeveloperGridFilter';

function TestDeveloperDashboard() {
    const [gridFilter, setGridFilter] = React.useState(null);

    const onGridFilterCHange = (...args) => {
        const [, value] = args;
        setGridFilter(value);
    };

    console.log(gridFilter);

    return (
        <div className='p-4'>
            <TestDeveloperGridFilter onChange={onGridFilterCHange} />
        </div>
    );
}

export default TestDeveloperDashboard;
