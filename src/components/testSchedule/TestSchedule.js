import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import sassTheme from '../root/_theme.scss';

const localizer = momentLocalizer(moment);

function TestSchedule({
    displayName,
    events,
    onChange,
    renderPopup,
}) {
    const [scheduleDetails, setScheduleDetails] = useState({
        open: false,
        coordinates: [0, 0],
        resource: {},
    });

    const openModal = (test, event) => {
        setScheduleDetails({
            open: true,
            coordinates: [event.clientX, event.clientY],
            resource: test.resource,
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
            {scheduleDetails.open && renderPopup(scheduleDetails, closeModal)}
        </div>
    );
}

TestSchedule.propTypes = {
    displayName: PropTypes.string,
    events: PropTypes.array,
    onChange: PropTypes.func,
    renderPopup: PropTypes.func,
};

TestSchedule.defaultProps = {
    displayName: 'Your',
    events: [],
    onChange: () => {},
    renderPopup: () => {},
};

export default TestSchedule;
