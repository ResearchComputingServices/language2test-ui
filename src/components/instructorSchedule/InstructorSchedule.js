import React from 'react';
import { Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ToastsStore from 'react-toasts';
import moment from 'moment';
import TestSchedule from '../testSchedule';
import { useMount, useService, useState, useMountedState } from '../../hooks';

function InstructorSchedule() {
    const isMounted = useMountedState();
    const [testScheduleService, historyService] = useService('testSchedule', 'history');
    const [tests, setTests] = useState([]);

    const getTests = async (start, end) => {
        try {
            const schedule = await testScheduleService.getInstructorSchedule(start, end);
            return schedule.map(agenda => {
                agenda.startDatetime = moment.utc(agenda.startDatetime).local();
                agenda.endDatetime = moment.utc(agenda.endDatetime).local();
                return ({
                    title: agenda.test.name,
                    start: agenda.startDatetime.toDate(),
                    end: agenda.endDatetime.toDate(),
                    'allDay?': false,
                    resource: { ...agenda },
                });
            });
        } catch (err) {
            ToastsStore.error('Failed to retrieve your test schedule');
            return [];
        }
    };

    useMount(async () => {
        try {
            if (isMounted()) {
                const start = moment().startOf('month');
                const end = moment().endOf('month');
                setTests(await getTests(start, end));
            }
        } catch (err) {}
    });

    return (
        <>
            <Tooltip title='Create Assignation'>
                <Fab
                    className='m-2'
                    color='primary'
                    onClick={() => historyService.go('/instructor/schedule/create')}
                    style={{
                        zIndex: 1000,
                        position: 'fixed',
                        bottom: 0,
                        right: 15,
                    }}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <TestSchedule
                events={tests}
                onChange={async (start, end) => setTests(await getTests(start, end))}
                renderPopup={scheduleDetails => {
                    console.log(scheduleDetails);
                    return null;
                }}
            />
        </>
    );
}

export default InstructorSchedule;
