import React from 'react';
import { Layout } from '../common';
import DemographicQuestionnaireFieldsGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('demographicQuestionnaireFields');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <DemographicQuestionnaireFieldsGrid
                onCreate={rolesCheckerService.has('create-demographic-questionnaire-field') ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has('export-demographic-questionnaire-field') ? actions.onExport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
