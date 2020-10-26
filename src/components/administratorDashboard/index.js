import React from 'react';
import { Typography } from '@material-ui/core';
import { useStore } from '../../hooks';
import Welcome from './Welcome';
import StudentClassesList from '../studentClasses/List';
import Users from '../users/Grid';

function AdministratorDashboard() {
    const userSession = useStore('userSession');
    return (
        <>
            <Welcome name={userSession.firstName} />
            <div className='dashboard-activities'>
                <div className='p-2'>
                    <Typography
                        className='pl-2 pb-2'
                        variant='h6'
                    >
                        My Classes
                    </Typography>
                    <StudentClassesList />
                </div>
                <div
                    className='p-2'
                    style={{
                        width: '50%',
                        minWidth: 700,
                    }}
                >
                    <Typography
                        className='pl-2'
                        variant='h6'
                    >
                        My Students
                    </Typography>
                    <div>
                        <Users />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdministratorDashboard;
