import React from 'react';
import TestSchedule from '../testSchedule';
import { useStore } from '../../hooks';

function InstructorSchedule() {
    const userSession = useStore('userSession');
    return <TestSchedule displayName={userSession.displayName} />;
}

export default InstructorSchedule;
