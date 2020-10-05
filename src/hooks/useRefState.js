import { useState, useRef, useEffect } from 'react';

export default function useRefState(initialValue) {
    const [state, setState] = useState(initialValue);
    const stateRef = useRef(state);
    useEffect(
        () => {
            stateRef.current = state;
        },
        [state],
    );
    return [() => stateRef.current, setState];
}
