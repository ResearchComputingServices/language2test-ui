import { useForm } from '../../../hooks';
import Component from '../../../components/form/fields/Checkbox';
import { createSnapshotTest } from '../../../testUtilities';

describe('Checkbox', () => {
    it('should match snapshot', createSnapshotTest(Component, {
        props: () => ({
            // eslint-disable-next-line react-hooks/rules-of-hooks
            controls: useForm(),
            field: {},
        }),
    }));
});
