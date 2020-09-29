import Introduction from '../../../components/testWizardResult/Introduction';
import { createSnapshotTest } from '../../../testUtilities';

describe('Introduction', () => {
    it('should match snapshot', createSnapshotTest(Introduction, {
        props: {
            onEvaluateClick: jest.fn(),
            introductionText: 'Test Introduction',
            buttonTitle: 'Save',
        },
    }));
});
