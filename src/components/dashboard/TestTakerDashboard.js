import React from 'react';
import { Fab, Tooltip } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { useService } from '../../hooks';

function TestTakerDashboard() {
    const historyService = useService('history');

    return (
        <div className='dashboard-actions'>
            <Tooltip title='My Scheduled Tests'>
                <Fab
                    className='m-2'
                    color='primary'
                    onClick={() => historyService.go('/test-taker/schedule')}
                >
                    <CalendarTodayIcon />
                </Fab>
            </Tooltip>
        </div>
    );
}

export default TestTakerDashboard;
