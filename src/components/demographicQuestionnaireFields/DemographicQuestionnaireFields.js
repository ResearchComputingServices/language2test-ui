import React from 'react';
import { Layout } from '../common';
import DemographicQuestionnaireFieldsGrid from './Grid';
import { useGridActions, useGridButtons } from '../../hooks';

export default function DemographicQuestionnaireFields() {
    const rights = {
        create: ['Administrator'],
        export: ['Administrator'],
        import: ['Administrator'],
    };
    const actions = useGridActions('demographicQuestionnaireFields');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout className='my-4'>
            <DemographicQuestionnaireFieldsGrid {...buttons} />
        </Layout>
    );
}
