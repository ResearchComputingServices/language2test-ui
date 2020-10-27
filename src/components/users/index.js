import React from 'react';
import FileSaver from 'file-saver';
import UsersGrid from './Grid';
import { Layout } from '../common';
import { useGridActions, useRolesCheckerService } from '../../hooks';

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
    const rolesCheckerService = useRolesCheckerService();
    return (
        <Layout className='my-4'>
            <UsersGrid
                onCreate={rolesCheckerService.has('create-user') ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has('export-user') ? actions.onExport : undefined}
                onImport={rolesCheckerService.has('import-user') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
