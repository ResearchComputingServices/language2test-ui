import React from 'react';
import { Layout } from '../common';
import TestSessionsGrid from './Grid';
import { useGridActions, useAuthorizationCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('testSessions');
    const authorizationCheckerService = useAuthorizationCheckerService();

    return (
        <Layout className='my-4'>
            <TestSessionsGrid
                onExport={authorizationCheckerService.has('export-test-session') ? () => actions.onExport('application/zip', 'zip') : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
