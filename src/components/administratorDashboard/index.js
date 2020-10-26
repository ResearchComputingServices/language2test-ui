import React from 'react';
import { useStore } from '../../hooks';
import Welcome from './Welcome';

function AdministratorDashboard() {
    const userSession = useStore('userSession');
    return (
        <>
            <Welcome name={userSession.firstName} />
        </>
    );
}

export default AdministratorDashboard;
