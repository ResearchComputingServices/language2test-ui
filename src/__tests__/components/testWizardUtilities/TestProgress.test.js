import Component from '../../../components/testWizardUtilities/TestProgress';
import timer from '../../../__mocks__/timer/default';
import { createSnapshotTest } from '../../../testUtilities';

describe('TestProgress', () => {
    it('should match snapshot', createSnapshotTest(Component, {
        props: {
            current: 0,
            total: 100,
            timer: 120,
            tick: 30,
            totalTick: 130,
        },
        state: { timer },
        mount: true,
    }));
});
