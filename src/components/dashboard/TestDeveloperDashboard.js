import React from 'react';
import { Fab, Tooltip, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useService } from '../../hooks';
import { TestsWithSessions, TestsNotInUse, UpcomingTests, ClonedTests } from '../testDeveloperGrids';
import Tests from '../tests/Grid';
import TestDeveloperGridFilter from './TestDeveloperGridFilter';

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
            <div className='test-developer-grids-container'>
                {getGrid(gridFilter)}
            </div>
            <div className='test-developer-tests-navigation'>
                <Button
                    className='test-developer-tests-navigation-button'
                    color='primary'
                    onClick={() => historyService.go('/vocabularies')}
                    variant='contained'
                >
                    Vocabularies
                </Button>
                <Button
                    className='test-developer-tests-navigation-button'
                    color='primary'
                    onClick={() => historyService.go('/clozes')}
                    variant='contained'
                >
                    Clozes
                </Button>
                <Button
                    className='test-developer-tests-navigation-button'
                    color='primary'
                    onClick={() => historyService.go('/reading-comprehensions')}
                    variant='contained'
                >
                    RC
                </Button>
                <Button
                    className='test-developer-tests-navigation-button'
                    color='primary'
                    onClick={() => historyService.go('/writings')}
                    variant='contained'
                >
                    Writings
                </Button>
            </div>
            <div className='dashboard-actions mb-2 mr-3'>
                <div className='row'>
                    <Tooltip title='Create a Test'>
                        <Fab
                            className='m-2'
                            color='primary'
                            onClick={() => historyService.go('test-developer/test')}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default TestDeveloperDashboard;
