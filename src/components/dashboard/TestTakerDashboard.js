import React, { useState } from 'react';
import { ToastsStore } from 'react-toasts';
import { Fab, Tooltip } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { ModalInfo } from '../common';
import { useService, useActions, useStore } from '../../hooks';
import UpcomingDemographicQuestionnaire from './UpcomingDemographicQuestionnaire';
import TestTakerStudentClasses from '../testTakerStudentClasses';
import ConsentToParticipate from './ConsentToParticipate';

function TestTakerDashboard() {
    const userService = useService('user');
    const historyService = useService('history');
    const userSession = useStore('userSession');
    const userSessionActions = useActions('userSession');
    const [loading, setLoading] = useState(false);
    const [showConsentModal, setShowConsentModal] = useState(userSession.agreeToParticipate == null);

    return (
        <>
            <ModalInfo show={showConsentModal}>
                <ConsentToParticipate
                    className='ml-4 mt-4 mb-2'
                    confirm
                    disabled={loading}
                    onConsent={async consent => {
                        try {
                            setLoading(true);
                            userSessionActions.assignUserSession(await userService.updateDemographicQuestionnaire({
                                ...userSession,
                                agreeToParticipate: consent,
                            }));
                            setShowConsentModal(false);
                            ToastsStore.success('Successfully updated consent');
                        } catch (err) {
                            ToastsStore.error('Failed to update consent');
                        } finally {
                            setLoading(false);
                        }
                    }}
                />
            </ModalInfo>
            {userSession.agreeToParticipate != null && (
                <ConsentToParticipate
                    className='ml-4 mt-4 mb-2'
                    defaultValue={userSession.agreeToParticipate}
                    disabled={loading}
                    onConsent={async consent => {
                        try {
                            setLoading(true);
                            userSessionActions.assignUserSession(await userService.updateDemographicQuestionnaire({
                                ...userSession,
                                agreeToParticipate: consent,
                            }));
                            setShowConsentModal(false);
                        } catch (err) {
                            ToastsStore.error('Failed to update consent');
                        } finally {
                            setLoading(false);
                        }
                    }}
                />
            )}
            <div className='dashboard-activities'>
                <UpcomingDemographicQuestionnaire className='my-4 mr-5' />
                <TestTakerStudentClasses />
                <div className='dashboard-actions'>
                    <Tooltip title='My Scheduled Tests'>
                        <Fab
                            className='m-2'
                            color='primary'
                            onClick={() => historyService.go('/test-taker/schedule')}
                        >
                            <CalendarTodayIcon />
                        </Fab>
                    </Tooltip>
                </div>
            </div>
        </>
    );
}

export default TestTakerDashboard;
