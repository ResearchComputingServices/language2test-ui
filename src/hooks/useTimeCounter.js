import { useEffect, useState, useRef } from 'react';

export default function useTimeCounter(initial, callback, delay) {
    const [tick, setTick] = useState(initial || 0);
    const [timerActive, setTimerActive] = useState(false);
    const ref = useRef();
    useEffect(() => {
        let interval = null;
        // If timer is active we create an interval.
        if (timerActive) {
            interval = setInterval(callback, delay);
        // When timer is deactivated via the setInterval specified above this if block will be executed.
        } else if (!timerActive && tick !== 0) {
            // When that happens we clear the interval.
            clearInterval(interval);
        }
        // Everytime the hook gets executed in the callback of the hook, we clear the interval and store the tick as a reference.
        return () => {
            ref.current = tick;
            clearInterval(interval);
        };
    // Effect gets executed only whenever there is a change in timerActive or tick state.
    // eslint-disable-next-line
    }, [timerActive, tick]);

    // Return all the necessary variables to use this hook.
    return [tick, setTick, setTimerActive, ref];
}
