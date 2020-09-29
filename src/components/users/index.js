import React from 'react';
import FileSaver from 'file-saver';
import UsersGrid from './Grid';
import { Layout } from '../common';
import { useGridActions, useAuthorizationCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('users', {
        import: file => {
            const blob = new Blob(
                [file],
                { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
            );
            FileSaver.saveAs(blob, 'user-import-report.xlsx');
        },
    });
    const authorizationCheckerService = useAuthorizationCheckerService();
    return (
        <Layout className='my-5'>
            <UsersGrid
                onCreate={authorizationCheckerService.has('create-user') ? actions.onCreate : undefined}
                onExport={authorizationCheckerService.has('export-user') ? actions.onExport : undefined}
                onImport={authorizationCheckerService.has('import-user') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
