import Title from '../../../components/testWizardResult/Title';
import { createSnapshotTest } from '../../../testUtilities';

describe('Title', () => {
    it('should match snapshot', createSnapshotTest(Title));
});
