import Component from '../../../components/testWizardUtilities/TestControls';
import { createSnapshotTest } from '../../../testUtilities';

describe('TestControl', () => {
    it('should match snapshot', createSnapshotTest(Component, {
        props: {
            onNextClick: jest.fn(),
            onPreviousClick: jest.fn(),
            progressIndex: 0,
            disableNextBtn: false,
        },
    }));
});
