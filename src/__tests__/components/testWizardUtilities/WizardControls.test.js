import Component from '../../../components/testWizardUtilities/WizardControls';
import { createSnapshotTest } from '../../../testUtilities';

describe('WizardControls', () => {
    it('should match snapshot', createSnapshotTest(Component, {
        props: {
            handleBack: jest.fn(),
            handleNext: jest.fn(),
            disableNext: false,
            disablePrevious: false,
        },
    }));
});
