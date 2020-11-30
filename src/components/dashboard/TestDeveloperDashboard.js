import React from 'react';
import { Fab, Tooltip, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useService, useGridActions } from '../../hooks';
import TestDeveloperTests from '../testDeveloperTests';

function TestDeveloperDashboard() {
    const historyService = useService('history');
    const { onExport } = useGridActions('tests');

    return (
        <div className='p-4'>
            <TestDeveloperTests />
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
                    <Tooltip title='Export Tests'>
                        <Fab
                            className='m-2'
                            color='primary'
                            onClick={onExport}
                        >
                            <GetAppIcon />
                        </Fab>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default TestDeveloperDashboard;
