import React from 'react';
import { Layout } from '../common';
import DemographicQuestionnaireFieldsGrid from './Grid';
import { useGridActions, useAuthorizationCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('demographicQuestionnaireFields');
    const authorizationCheckerService = useAuthorizationCheckerService();

    return (
        <Layout className='my-5'>
            <DemographicQuestionnaireFieldsGrid
                onCreate={authorizationCheckerService.has('create-demographic-questionnaire-field') ? actions.onCreate : undefined}
                onExport={authorizationCheckerService.has('export-demographic-questionnaire-field') ? actions.onExport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
