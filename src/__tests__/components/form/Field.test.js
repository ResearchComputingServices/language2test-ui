import { TextField } from '@material-ui/core';
import { useForm } from '../../../hooks';
import Component from '../../../components/form/fields/Field';
import { createSnapshotTest } from '../../../testUtilities';

describe('Field', () => {
    it('should match snapshot', createSnapshotTest(Component, {
        props: () => ({
            // eslint-disable-next-line react-hooks/rules-of-hooks
            controls: useForm(),
            field: {},
            children: TextField,
        }),
    }));
});
