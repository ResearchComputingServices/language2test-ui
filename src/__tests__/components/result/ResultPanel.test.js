import React from 'react';
import ResultPanel from '../../../components/result/ResultPanel';
import { createSnapshotTest } from '../../../testUtilities';

describe('ResultPanel', () => {
    it('should match snapshot', createSnapshotTest(ResultPanel, {
        props: {
            title: 'Some Title',
            marks: '0/100',
        },
    }), <div>Test Child</div>);
});
