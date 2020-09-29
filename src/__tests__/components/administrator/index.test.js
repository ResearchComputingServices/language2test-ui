import Administrator from '../../../components/administrator';
import { createSnapshotTest } from '../../../testUtilities';

describe('administrator', () => {
    it('should match snapshot', createSnapshotTest(Administrator, {}));
});
