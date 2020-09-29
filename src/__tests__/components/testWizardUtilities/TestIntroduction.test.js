import Component from '../../../components/testWizardUtilities/TestIntroduction';
import { createSnapshotTest } from '../../../testUtilities';

describe('TestIntroduction', () => {
    it('should match snapshot', createSnapshotTest(Component, {
        props: {
            onStartClick: jest.fn(),
            introductionText: 'Some Test',
            buttonTitle: 'Some Title',
        },
    }));
});
