import Form from '../../../components/form';
import sampleLayout from '../../../config/formLayouts/demographicQuestionnaireFormLayout';
import { createSnapshotTest } from '../../../testUtilities';

describe('form', () => {
    it('should match snapshot', createSnapshotTest(Form, {
        props: {
            initialValues: {},
            controls: {},
            layout: sampleLayout,
            onSubmit: jest.fn(),
            buttonTitle: 'Save',
            data: {},
        },
    }));
});
