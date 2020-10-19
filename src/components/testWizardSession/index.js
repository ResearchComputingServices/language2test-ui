import _ from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
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
    const [service, historyService] = useService(['test', 'history']);
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

    const getTests = (current, future) => {
        console.log(current, future);
        return [
            {
                title: 'Beginner Test',
                start: moment().toDate(),
                end: moment().add(60, 'minutes').toDate(),
                'allDay?': false,
                resource: { groot: true },
            },
            {
                title: 'Medium Test',
                start: moment().add(120, 'minutes').toDate(),
                end: moment().add(120, 'minutes').add(60, 'minutes').toDate(),
                'allDay?': false,
                resource: { groot: true },
            },
            {
                title: 'Advanced Test',
                start: moment().add(1, 'days').toDate(),
                end: moment().add(1, 'days').add(60, 'minutes').toDate(),
                'allDay?': false,
                resource: { groot: true },
            },
        ];
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
                onSelectEvent={event => {
                    console.log(event);
                }}
            />
        </Layout>
    );
}

export default TestWizardSession;
