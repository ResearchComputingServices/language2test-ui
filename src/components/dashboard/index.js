import React, { useState } from 'react';
import _ from 'lodash';
import InstructorDashboard from './InstructorDashboard';
import TestTakerDashboard from './TestTakerDashboard';
import { useStore } from '../../hooks';
import Header from './Header';

function Dashboard() {
    const userSession = useStore('userSession');
    const defaultRoleValue = _.get(_.first(_.get(userSession, 'roles')), 'name');
    const [selectedRole, setSelectedRole] = useState(defaultRoleValue);

    const onViewAsChange = role => {
        setSelectedRole(role);
    };

    const getDashboardViewPerRole = role => ({
        Instructor: <InstructorDashboard />,
        'Test Taker': <TestTakerDashboard />,
        undefined: null,
    }[role]);

    return (
        <>
            <Header
                defaultRoleValue={defaultRoleValue}
                name={userSession.firstName}
                onViewAsChange={onViewAsChange}
                roles={userSession.roles.map(role => role.name)}
            />
            <div className='dashboard-activities'>
                {getDashboardViewPerRole(selectedRole)}
            </div>
        </>
    );
}

export default Dashboard;
