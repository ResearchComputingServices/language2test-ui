import React from 'react';
import { Layout } from '../common';
import TestSessionsGrid from './Grid';
import { useGridActions, useAuthorizationCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('testSessions');
    const authorizationCheckerService = useAuthorizationCheckerService();

    return (
        <Layout className='my-5'>
            <TestSessionsGrid
                onExport={authorizationCheckerService.has('export-test-session') ? actions.onExport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
