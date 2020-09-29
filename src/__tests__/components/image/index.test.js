import Component from '../../../components/image';
import { createSnapshotTest } from '../../../testUtilities';

describe('image', () => {
    it('should match snapshot', createSnapshotTest(Component, { props: { imageName: '' } }));
});
