import React from 'react';
import { ToastsStore } from 'react-toasts';
import { Fab, Tooltip } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PublishIcon from '@material-ui/icons/Publish';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InstructorStudentClasses from '../instructorStudentClasses';
import { useService } from '../../hooks';
import { FileUploader } from '../common';

function InstructorDashboard() {
    const [historyService, instructorService] = useService('history', 'instructor');
    return (
        <div className='dashboard-activities'>
            <InstructorStudentClasses />
            <div className='dashboard-actions'>
                <div className='row'>
                    <Tooltip title='My Scheduled Tests'>
                        <Fab
                            className='m-2'
                            color='primary'
                            onClick={() => historyService.go('/instructor/schedule')}
                        >
                            <CalendarTodayIcon />
                        </Fab>
                    </Tooltip>
                    <Tooltip title='Create a Class'>
                        <Fab
                            className='m-2'
                            color='primary'
                            onClick={() => historyService.go('/instructor/student-class')}
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
                            try {
                                await instructorService.importStudentClasses(...args);
                            } catch (err) {
                                ToastsStore.error('Failed to import classes');
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default InstructorDashboard;
