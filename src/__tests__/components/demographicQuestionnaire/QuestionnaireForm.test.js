import React from 'react';
import QuestionnaireForm from '../../../components/demographicQuestionnaire/QuestionnaireForm';
import sampleLayout from '../../../config/formLayouts/demographicQuestionnaireFormLayout';
import { createSnapshotTest } from '../../../testUtilities';

describe('QuestionnaireForm', () => {
    it('should match snapshot', createSnapshotTest(QuestionnaireForm, {
        props: {
            data: {},
            dynamicData: {},
            dynamicLayout: [],
            layout: sampleLayout,
            onSubmit: jest.fn(),
            controls: {},
        },
        children: <div>Test Child</div>,
    }));
});
