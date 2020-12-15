import React from 'react';
import { Layout } from '../common';
import DemographicQuestionnaireFieldsGrid from './Grid';
import { useGridActions, useGridButtons } from '../../hooks';

export default function DemographicQuestionnaireFields() {
    const rights = {
        create: ['Administrator', 'Test Developer'],
        export: ['Administrator', 'Test Developer'],
        import: ['Administrator', 'Test Developer'],
    };
    const actions = useGridActions('demographicQuestionnaireFields');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout className='my-4'>
            <DemographicQuestionnaireFieldsGrid {...buttons} />
        </Layout>
    );
}
