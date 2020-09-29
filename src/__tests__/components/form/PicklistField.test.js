import { useForm } from '../../../hooks';
import Component from '../../../components/form/fields/PicklistField';
import { createSnapshotTest } from '../../../testUtilities';

describe('PicklistField', () => {
    it('should match snapshot', createSnapshotTest(Component, {
        props: () => ({
            // eslint-disable-next-line react-hooks/rules-of-hooks
            controls: useForm(),
            field: {},
        }),
    }));
});
