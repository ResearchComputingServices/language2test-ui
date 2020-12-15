import React from 'react';
import {
    useStore,
    useActions,
    useService,
} from '../../hooks';
import {
    TestsWithSessions,
    TestsNotInUse,
    UpcomingTests,
    ClonedTests,
} from '.';
import Tests from '../tests/Grid';
import TestsGridFilter from './TestsGridFilter';

function TestDeveloperTests() {
    const { gridFilter } = useStore('testDeveloperTestsGridFilter');
    const { setGridFilter } = useActions('testDeveloperTestsGridFilter');
    const historyService = useService('history');
    const [gridMap] = React.useState({
        'In Use (with a past result)': <TestsWithSessions />,
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
        return <Tests onRowClick={(event, data) => historyService.go(`test-developer/test/${data.id}`)} />;
    };

    return (
        <>
            <TestsGridFilter
                className='ml-2'
                defaultValue={gridFilter}
                onChange={onGridFilterCHange}
                options={Object.keys(gridMap)}
            />
            <div className='test-developer-tests-grid-container'>
                {getGrid(gridFilter)}
            </div>
        </>
    );
}

export default TestDeveloperTests;
