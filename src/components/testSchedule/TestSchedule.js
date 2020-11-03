import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import sassTheme from '../root/_theme.scss';
import TestScheduleDetails from './TestScheduleDetails';

const localizer = momentLocalizer(moment);

function TestSchedule({
    displayName,
    events,
    onChange,
    onTestStart,
}) {
    const [scheduleDetails, setScheduleDetails] = useState({
        open: false,
        coordinates: [0, 0],
        testName: '',
        startDatetime: '',
        endDatetime: '',
        taken: false,
    });

    const openModal = (test, event) => {
        setScheduleDetails({
            open: true,
            testName: test.resource.testName,
            coordinates: [event.clientX, event.clientY],
            startDatetime: test.resource.startDatetime,
            endDatetime: test.resource.endDatetime,
            taken: test.resource.taken,
            testId: test.resource.testId,
            studentClassName: test.resource.studentClassName,
        });
    };

    const closeModal = () => {
        setScheduleDetails(d => ({
            ...d,
            open: false,
        }));
    };

    return (
        <div className='test-schedule-container'>
            <h1 className='text-muted'>{`${displayName === 'Your' ? displayName : `${displayName}'s`} Test Schedule`}</h1>
            <div className='test-schedule MuiPaper-elevation3'>
                <Calendar
                    endAccessor='end'
                    eventPropGetter={event => {
                        const { start, end } = event;
                        const { resource } = event;
                        const now = moment();
                        const canTakeTest = now.isBetween(start, end) && !resource.taken;
                        return {
                            style: {
                                background: canTakeTest
                                    ? undefined
                                    : sassTheme.disabledColor,
                            },
                        };
                    }}
                    events={events}
                    localizer={localizer}
                    onNavigate={month => onChange(moment(month).startOf('month'), moment(month).endOf('month'))}
                    onSelectEvent={openModal}
                    popup
                    startAccessor='start'
                    views={['month', 'week', 'day']}
                />
            </div>
            {scheduleDetails.open && (
                <TestScheduleDetails
                    canTakeTest={moment().isBetween(scheduleDetails.startDatetime, scheduleDetails.endDatetime) && !scheduleDetails.taken}
                    coordinates={scheduleDetails.coordinates}
                    endDatetime={scheduleDetails.endDatetime.format('LLLL')}
                    handleClose={closeModal}
                    isPast={moment().isAfter(scheduleDetails.endDatetime)}
                    onTestStart={onTestStart}
                    open={scheduleDetails.open}
                    startDatetime={scheduleDetails.startDatetime.format('LLLL')}
                    studentClassName={scheduleDetails.studentClassName}
                    taken={scheduleDetails.taken}
                    testId={scheduleDetails.testId}
                    testName={scheduleDetails.testName}
                />
            )}
        </div>
    );
}

TestSchedule.propTypes = {
    displayName: PropTypes.string,
    events: PropTypes.array,
    onChange: PropTypes.func,
    onTestStart: PropTypes.func,
};

TestSchedule.defaultProps = {
    displayName: 'Your',
    events: [],
    onChange: () => {},
    onTestStart: () => {},
};

export default TestSchedule;
