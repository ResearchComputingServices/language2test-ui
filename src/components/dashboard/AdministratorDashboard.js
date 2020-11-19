import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import Users from '../users';
import { useService } from '../../hooks';
import { InfiniteList } from '../common';
import AdministratorLoggedInUserCard from './AdministratorLoggedInUserCard';

function AdministratorDashboard() {
    const userService = useService('user');
    return (
        <div className='row p-3'>
            <div className='administrator-dashboard-users'>
                <Users />
            </div>
            <div className='administrator-dashboard-logged-in-users'>
                <InfiniteList
                    fetch={userService.getUserSessions}
                    noDataTitle='No active sessions'
                    renderRow={(data, index) => (
                        <AdministratorLoggedInUserCard
                            key={index}
                            displayName={`${data.firstName} ${data.lastName}`}
                            lastAccessTime={moment(data.lastAccessDateTime).format('LLLL')}
                            roles={_.reduce(data.roles, (acc, role) => {
                                acc += role.name;
                                return acc;
                            }, '')}
                            sessionStartTime={moment(data.sessionStartTime).format('LLLL')}
                            username={data.name}
                        />
                    )}
                    style={{ maxWidth: 600 }}
                    title='Logged in Users'
                />
            </div>
        </div>
    );
}

export default AdministratorDashboard;
