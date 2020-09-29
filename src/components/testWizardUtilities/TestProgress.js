import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ProgressWatch } from '../common';
import { useIsVisible, useStore, useActions } from '../../hooks';

function TestProgress({
    current,
    total,
}) {
    const { tick, totalTick, timerActive } = useStore('timer');
    const { setTick, endTimer } = useActions('timer');
    const tickRef = useRef();

    const perTick = () => {
        const newTick = tick - 1;
        // if the tick falls below 0 then we deactivate the timer and end the test.
        if (newTick < 1) {
            endTimer();
        } else if (timerActive) {
            setTick(newTick);
        }
    };

    useEffect(() => {
        let interval = null;
        // If timer is active we create an interval.
        if (timerActive) {
            interval = setInterval(perTick, 1000);
        // When timer is deactivated via the setInterval specified above this if block will be executed.
        } else if (!timerActive && tick !== 0) {
            // When that happens we clear the interval.
            clearInterval(interval);
        }
        // Everytime the hook gets executed in the callback of the hook, we clear the interval and store the tick as a reference.
        return () => {
            tickRef.current = tick;
            clearInterval(interval);
        };
    // Effect gets executed only whenever there is a change in timerActive or tick state.
    // eslint-disable-next-line
    }, [timerActive, tick]);

    const formatDigit = digit => (digit / 10 < 1 ? `0${digit}` : digit);

    const getTimeRemaining = () => {
        if (tick < 0 || !_.isNumber(tick)) return '∞';
        // Get result of tick / 60.
        const minutes = Math.floor(tick / 60);
        // Get remainder of tick / 60.
        const seconds = Math.floor(tick % 60);
        return `${formatDigit(minutes)}:${formatDigit(seconds)}`;
    };

    const getProgressValue = () => ((totalTick - tick) / totalTick) * 100;

    const divRef = useRef(null);
    const isVisible = useIsVisible(divRef.current);

    return (
        <div
            ref={divRef}
            className='test-progress'
        >
            <div className='test-progress-header'>
                <h5>
                    {`${current} out of ${total}`}
                </h5>
                <h5>
                    {`Time Remaining: ${getTimeRemaining()}`}
                </h5>
            </div>
            <LinearProgress
                className='test-progress-bar'
                color='primary'
                value={getProgressValue()}
                variant='determinate'
            />
            {!isVisible && (
                <ProgressWatch
                    anchored
                    tick={tick}
                    totalTick={totalTick}
                />
            )}
        </div>
    );
}

TestProgress.propTypes = {
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

export default TestProgress;
