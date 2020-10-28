import React from 'react';
import { Layout } from '../common';
import VocabulariesGrid from './Grid';
import { useGridActions, useGridButtons } from '../../hooks';

export default function Vocabularies() {
    const rights = {
        create: ['Administrator'],
        export: ['Administrator'],
        import: ['Administrator'],
    };
    const actions = useGridActions('vocabularies');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout className='my-4'>
            <VocabulariesGrid {...buttons} />
        </Layout>
    );
}
