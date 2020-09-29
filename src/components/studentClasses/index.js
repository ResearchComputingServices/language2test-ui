import React from 'react';
import { Layout } from '../common';
import StudentClassesGrid from './Grid';
import { useGridActions, useAuthorizationCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('studentClasses');
    const authorizationCheckerService = useAuthorizationCheckerService();

    return (
        <Layout className='my-5'>
            <StudentClassesGrid
                onCreate={authorizationCheckerService.has('create-student-class') ? actions.onCreate : undefined}
                onExport={authorizationCheckerService.has('export-student-class') ? actions.onExport : undefined}
                onImport={authorizationCheckerService.has('import-student-class') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
