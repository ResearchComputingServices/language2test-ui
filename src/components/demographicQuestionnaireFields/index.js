import React from 'react';
import { Layout } from '../common';
import DemographicQuestionnaireFieldsGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function DemographicQuestionnaireFields() {
    const actions = useGridActions('demographicQuestionnaireFields');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <DemographicQuestionnaireFieldsGrid
                onCreate={rolesCheckerService.has(['Administrator']) ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has(['Administrator']) ? actions.onExport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
