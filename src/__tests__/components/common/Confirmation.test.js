import Confirmation from '../../../components/common/Confirmation';
import { createSnapshotTest } from '../../../testUtilities';
import dialog from '../../../__mocks__/dialog/default';

it('should match snapshot', createSnapshotTest(Confirmation, {
    state: { dialog },
    mount: true,
}));
