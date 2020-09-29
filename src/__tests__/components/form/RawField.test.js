import React from 'react';
import { useForm } from '../../../hooks';
import Component from '../../../components/form/fields/RawField';
import { createSnapshotTest } from '../../../testUtilities';

describe('RawField', () => {
    it('should match snapshot', createSnapshotTest(Component, {
        props: () => ({
            // eslint-disable-next-line react-hooks/rules-of-hooks
            controls: useForm(),
            field: {},
            content: <div>Test</div>,
        }),
    }));
});
