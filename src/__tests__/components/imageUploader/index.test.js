import Component from '../../../components/imageUploader';
import { createSnapshotTest } from '../../../testUtilities';

describe('imageUploader', () => {
    it('should match snapshot', createSnapshotTest(Component, {
        props: {
            imageName: '',
            onUpload: jest.fn(),
        },
    }));
});
