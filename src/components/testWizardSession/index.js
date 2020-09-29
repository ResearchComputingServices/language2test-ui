import _ from 'lodash';
import React, { useState } from 'react';
import { Layout } from '../common';
import TermsAndConditions from './TermsAndConditions';
import TestSelector from './TestSelector';
import {
    useStore,
    useActions,
    useTestWizardActions,
    useMount,
    useService,
    useMountedState,
} from '../../hooks';

function TestWizardSession() {
    const isMounted = useMountedState();
    const [testService, historyService] = useService(['test', 'history']);
    const storeActions = useTestWizardActions();
    const { error, loading } = useStore('testWizardSession');
    const {
        startTestWizardSession,
        startFetch,
        endFetch,
        setError,
        resetTestWizardSession,
    } = useActions('testWizardSession');
    const [tests, setTests] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);

    const onTermsAndConditonsChange = _.noop;

    const onTestChange = (event, data) => setSelectedTest(data);

    const onTestStart = () => {
        // We reset everything related to testWizardSessions
        resetTestWizardSession();
        const { id, name, steps, testUserFieldCategory, mandatoryTestUserFieldCategory } = selectedTest;
        // TODO - Maybe steps should come preconfigured with demographic questionnaire.
        const wizardSteps = [{
            type: 'demographicQuestionnaire',
            valid: _.isEmpty(mandatoryTestUserFieldCategory),
            fields: testUserFieldCategory,
            mandatoryFields: _.reduce(mandatoryTestUserFieldCategory, (accumulator, field) => {
                accumulator[field.name] = true;
                return accumulator;
            }, {}),
        }];
        _.each(steps, (step, index) => {
            const { type } = step;
            if (type) {
                const { values: questions } = step;
                step = {};
                step.type = _.camelCase(type);
                if (index !== 0) {
                    step.dependency = index;
                }
                wizardSteps.push(step);
                const action = storeActions[step.type];
                if (!_.isNil(action)) {
                    action.addQuestions(questions);
                }
            }
        });
        startTestWizardSession({
            id,
            name,
            wizardSteps,
        });
        historyService.go('/test/wizard');
    };

    useMount(async () => {
        startFetch();
        try {
            const tests = await testService.get({ url: 'wizard' });
            if (isMounted()) {
                setTests(tests);
            }
        } catch (err) {
            setError(_.get(err, 'response.status', true) || true);
        } finally {
            endFetch();
        }
    });

    return (
        <Layout
            error={error}
            loading={loading}
        >
            <TermsAndConditions onChange={onTermsAndConditonsChange} />
            <TestSelector
                disableStart={_.isNil(selectedTest)}
                onChange={onTestChange}
                onStart={onTestStart}
                tests={tests}
            />
        </Layout>
    );
}

export default TestWizardSession;
