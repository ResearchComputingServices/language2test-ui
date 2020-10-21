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
    const [testScheduleService, testService, historyService] = useService(['testSchedule', 'test', 'history']);
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

    const onTestStart = async testId => {
        const test = await testService.get({ id: testId });
        resetTestWizardSession();
        const { id, name, steps, testUserFieldCategory, mandatoryTestUserFieldCategory } = test;
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

    const getTests = async (start, end) => {
        try {
            const schedule = await testScheduleService.get(start, end);
            return schedule.map(agenda => {
                agenda.startDatetime = moment.utc(agenda.startDatetime).local();
                agenda.endDatetime = moment.utc(agenda.endDatetime).local();
                return ({
                    title: agenda.testName,
                    start: agenda.startDatetime.toDate(),
                    end: agenda.endDatetime.toDate(),
                    'allDay?': false,
                    resource: { ...agenda },
                });
            });
        } catch (err) {
            ToastsStore.error('Failed to retrieve your test schedule');
            return [];
        }
    };

    useMount(async () => {
        startFetch();
        try {
            if (isMounted()) {
                const start = moment().startOf('month');
                const end = moment().endOf('month');
                setTests(await getTests(start, end));
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
                onChange={async (start, end) => setTests(await getTests(start, end))}
                onTestStart={onTestStart}
            />
        </Layout>
    );
}

export default TestWizardSession;
