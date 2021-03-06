import React from 'react';
import _ from 'lodash';
import InstructorDashboard from './InstructorDashboard';
import TestTakerDashboard from './TestTakerDashboard';
import TestDeveloperDashboard from './TestDeveloperDashboard';
import AdministratorDashboard from './AdministratorDashboard';
import { useStore, useActions, useMount } from '../../hooks';
import { NotYetImplemented } from '../common';
import Header from './Header';

function Dashboard() {
    const userSession = useStore('userSession');
    const dashboard = useStore('dashboard');
    const dashboardActions = useActions('dashboard');

    const getDefaultRole = () => _.get(_.first(_.get(userSession, 'roles')), 'name');

    useMount(() => {
        if (_.isNil(dashboard.viewAs)) {
            dashboardActions.setViewAs(getDefaultRole());
        }
    });

    const onViewAsChange = role => dashboardActions.setViewAs(role);

    const getDashboardViewPerRole = role => ({
        Instructor: <InstructorDashboard />,
        'Test Taker': <TestTakerDashboard />,
        Administrator: <AdministratorDashboard />,
        'Test Developer': <TestDeveloperDashboard />,
    }[role] || <NotYetImplemented />);

    return (
        <>
            <Header
                defaultRoleValue={dashboard.viewAs || getDefaultRole()}
                name={userSession.firstName}
                onViewAsChange={onViewAsChange}
                roles={userSession.roles.map(role => role.name)}
            />
            <div>
                {getDashboardViewPerRole(dashboard.viewAs)}
            </div>
        </>
    );
}

export default Dashboard;
