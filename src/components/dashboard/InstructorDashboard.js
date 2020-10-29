import React from 'react';
import { Fab, Tooltip } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PublishIcon from '@material-ui/icons/Publish';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InstructorStudentClasses from '../instructorStudentClasses';
import { useService, useGridActions } from '../../hooks';
import FileUploader from '../fileUploader';

function InstructorDashboard() {
    const historyService = useService('history');
    const gridActions = useGridActions('studentClass');
    return (
        <div className='dashboard-activities'>
            <InstructorStudentClasses />
            <div style={{
                position: 'fixed',
                right: 20,
            }}
            >
                <div className='row'>
                    <Tooltip title='Create a Class'>
                        <Fab
                            className='m-2'
                            color='primary'
                            onClick={() => historyService.go('/student-classes/student-class')}
                        >
                            <PersonAddIcon />
                        </Fab>
                    </Tooltip>
                    <FileUploader
                        acceptedFiles={[
                            'application/vnd.ms-excel',
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        ]}
                        as={({ handleOpen }) => (
                            <Tooltip title='Import a Class'>
                                <Fab
                                    className='m-2'
                                    color='primary'
                                    onClick={handleOpen}
                                >
                                    <PublishIcon />
                                </Fab>
                            </Tooltip>
                        )}
                        onUpload={async (...args) => {
                            await gridActions.onImport(...args);
                        }}
                    />
                </div>
            </div>
            <Tooltip title='My Assignations'>
                <Fab
                    className='m-2'
                    color='primary'
                    onClick={() => historyService.go('/instructor/test-assignations')}
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        right: 10,
                    }}
                >
                    <CalendarTodayIcon />
                </Fab>
            </Tooltip>
        </div>
    );
}

export default InstructorDashboard;
