import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import sassTheme from '../root/_theme.scss';

const localizer = momentLocalizer(moment);

function Calendar({
    displayName,
    events,
    onSelectEvent,
    onChange,
}) {
    return (
        <div className='test-schedule-container'>
            <h1 className='text-muted'>{`${displayName === 'Your' ? displayName : `${displayName}'s`} Test Schedule`}</h1>
            <div className='test-schedule MuiPaper-elevation3'>
                <BigCalendar
                    endAccessor='end'
                    eventPropGetter={event => {
                        let { start, end } = event;
                        start = moment(start);
                        end = moment(end);
                        const now = moment();
                        const canTakeTest = now.isBetween(start, end);
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
                    onSelectEvent={onSelectEvent}
                    startAccessor='start'
                    views={['month', 'week', 'day']}
                />
            </div>
        </div>
    );
}

Calendar.propTypes = {
    displayName: PropTypes.string,
    events: PropTypes.array,
    onSelectEvent: PropTypes.func,
    onChange: PropTypes.func,
};

Calendar.defaultProps = {
    displayName: 'Your',
    events: [],
    onSelectEvent: undefined,
    onChange: () => {},
};

export default Calendar;
