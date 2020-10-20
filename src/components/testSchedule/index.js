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
}) {
    const [modalState, setModalState] = useState({
        open: false,
        coordinates: [0, 0],
    });
    return (
        <div className='test-schedule-container'>
            <h1 className='text-muted'>{`${displayName === 'Your' ? displayName : `${displayName}'s`} Test Schedule`}</h1>
            <div className='test-schedule MuiPaper-elevation3'>
                <Calendar
                    endAccessor='end'
                    eventPropGetter={event => {
                        let { start, end } = event;
                        const { resource } = event;
                        start = moment(start);
                        end = moment(end);
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
                    onNavigate={month => onChange(moment(month), moment(month).add(1, 'months'))}
                    onSelectEvent={(test, event) => {
                        setModalState({
                            open: true,
                            coordinates: [event.clientX, event.clientY],
                        });
                    }}
                    startAccessor='start'
                    views={['month', 'week', 'day']}
                />
            </div>
            <TestScheduleDetails
                coordinates={modalState.coordinates}
                handleClose={() => {
                    setModalState({
                        open: false,
                        coordinates: [0, 0],
                    });
                }}
                open={modalState.open}
            />
        </div>
    );
}

TestSchedule.propTypes = {
    displayName: PropTypes.string,
    events: PropTypes.array,
    onChange: PropTypes.func,
};

TestSchedule.defaultProps = {
    displayName: 'Your',
    events: [],
    onChange: () => {},
};

export default TestSchedule;
