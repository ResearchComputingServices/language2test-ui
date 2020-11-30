import React from 'react';
import TestDeveloperGridFilter from './TestDeveloperGridFilter';
import Tests from '../tests/Grid';
import { TestsWithSessions, TestsNotInUse, UpcomingTests, ClonedTests } from '../testDeveloperGrids';
import { useService } from '../../hooks';

function TestDeveloperDashboard() {
    const [gridFilter, setGridFilter] = React.useState(null);
    const historyService = useService('history');
    const [gridMap] = React.useState({
        'In Use (with a test session)': <TestsWithSessions />,
        'Upcoming/Assigned': <UpcomingTests />,
        Unused: <TestsNotInUse />,
        'Cloned Tests': <ClonedTests />,
    });

    const onGridFilterCHange = (...args) => {
        const [, value] = args;
        setGridFilter(value);
    };

    const getGrid = gridFilter => {
        if (gridFilter in gridMap) {
            return <div className='ml-2 my-4'>{gridMap[gridFilter]}</div>;
        }
        return (
            <Tests onRowClick={() => {
                historyService.go('test-developer/test/1');
            }}
            />
        );
    };

    return (
        <div className='p-4'>
            <TestDeveloperGridFilter
                className='ml-2'
                onChange={onGridFilterCHange}
                options={Object.keys(gridMap)}
            />
            {getGrid(gridFilter)}
        </div>
    );
}

export default TestDeveloperDashboard;
