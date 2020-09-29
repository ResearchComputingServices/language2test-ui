import React from 'react';
import { Layout } from '../common';
import TestsGrid from './Grid';
import { useGridActions, useAuthorizationCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('tests');
    const authorizationCheckerService = useAuthorizationCheckerService();

    return (
        <Layout className='my-5'>
            <TestsGrid
                onCreate={authorizationCheckerService.has('create-test') ? actions.onCreate : undefined}
                onExport={authorizationCheckerService.has('export-test') ? actions.onExport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
