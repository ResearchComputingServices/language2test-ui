import React from 'react';
import { Layout } from '../common';
import StudentClassesGrid from './Grid';
import { useGridActions, useGridButtons } from '../../hooks';

export default function StudentClasses() {
    const rights = {
        create: ['Administrator'],
        export: ['Administrator'],
        import: ['Administrator'],
    };
    const actions = useGridActions('studentClasses');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout className='my-4'>
            <StudentClassesGrid {...buttons} />
        </Layout>
    );
}
