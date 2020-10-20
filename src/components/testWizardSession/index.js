import _ from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { ToastsStore } from 'react-toasts';
import { Layout } from '../common';
import TestSchedule from '../testSchedule';
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
    const [testService, testAssignationService, historyService] = useService(['test', 'testAssignation', 'history']);
    const storeActions = useTestWizardActions();
    const { error, loading } = useStore('testWizardSession');
    const { displayName } = useStore('userSession');
    const {
        startTestWizardSession,
        startFetch,
        endFetch,
        setError,
        resetTestWizardSession,
    } = useActions('testWizardSession');
    const [tests, setTests] = useState([]);

    const onTestStart = selectedTest => {
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

    const getTests = async (current, future) => {
        try {
            const schedule = await testAssignationService.getSchedule(current, future);
            return schedule.map(agenda => ({
                title: agenda.testName,
                start: moment(agenda.startDatetime).toDate(),
                end: moment(agenda.endDatetime).toDate(),
                'allDay?': false,
                resource: { ...agenda },
            }));
        } catch (err) {
            ToastsStore.error('Failed to retrieve your test schedule');
            return [];
        }
    };

    useMount(async () => {
        startFetch();
        try {
            if (isMounted()) {
                const current = moment();
                const future = moment().add(1, 'months');
                setTests(await getTests(current, future));
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
            <TestSchedule
                displayName={displayName}
                events={tests}
                onChange={async (current, future) => setTests(await getTests(current, future))}
            />
        </Layout>
    );
}

export default TestWizardSession;
