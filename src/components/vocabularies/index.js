import React from 'react';
import { Layout } from '../common';
import VocabulariesGrid from './Grid';
import { useGridActions, useGridButtons } from '../../hooks';

export default function Vocabularies() {
    const rights = {
        create: ['Administrator', 'Test Developer'],
        export: ['Administrator', 'Test Developer', 'Instructor'],
        import: ['Administrator', 'Test Developer'],
    };
    const actions = useGridActions('vocabularies');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout className='my-4'>
            <VocabulariesGrid {...buttons} />
        </Layout>
    );
}
