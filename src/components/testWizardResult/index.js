import React from 'react';
import _ from 'lodash';
import Introduction from './Introduction';
import Title from './Title';
import ResultStatistics from '../result/ResultStatistics';
import ResultPanel from '../result/ResultPanel';
import testWizardSteps from '../../config/wizardSteps/testWizardSteps';
import {
    useMount,
    useActions,
    useStore,
    useTestWizardStores,
    useService,
} from '../../hooks';

export default function TestWizardResults() {
    const testSessionService = useService('testSession');
    const stepStores = useTestWizardStores();
    const {
        id: testId,
        name: sessionName,
        wizardSteps,
        startDatetime,
        endDatetime,
    } = useStore('testWizardSession');
    const { error } = useStore('results');
    const {
        displayName,
        id: userId,
    } = useStore('userSession');
    const { endTestWizardSession } = useActions('testWizardSession');
    const {
        startFetch,
        endFetch,
        setError,
    } = useActions('results');

    // To prevent loading indicator from taken away from the screen if some error occurs.
    useMount(() => endFetch());

    const testSteps = _.reduce(wizardSteps, (accumulator, step) => {
        const stepData = testWizardSteps[step.type];
        const storeName = _.get(stepData, 'storeName');
        if (!_.isNil(storeName)) {
            accumulator.push(stepData);
        }
        return accumulator;
    }, []);

    const getResult = (store, entity) => {
        if (_.isEmpty(store.questions)) return [];
        return [{
            answers: _.map(store.answers, (answer, index) => ({
                ...answer,
                [`${entity}Id`]: store.questions[index].id,
            })),
            start: store.startDatetime,
            end: store.endDatetime,
        }];
    };

    const getNestedResult = (store, entity) => {
        const results = [];
        _.each(store.questions, (question, progressIndex) => {
            results.push({
                end: store.endDateTimes[progressIndex],
                start: store.startDateTimes[progressIndex],
                answer: store.answers[progressIndex],
                [`${entity}Id`]: question.id,
            });
        });
        return results;
    };

    const getNestedResultsWithSubQuestions = (store, entity) => {
        const results = [];
        _.each(store.questions, (question, progressIndex) => {
            const answers = [];
            _.each(store.questions[progressIndex].questions, (question, index) => {
                const rcAnswers = store.answers[progressIndex] || [];
                const rcAnswer = rcAnswers[index];
                if (_.isNil(rcAnswer)) {
                    answers.push({
                        // TODO this logic should be in cloze itself.
                        seen: _.eq(entity, 'cloze') || false,
                        attempted: false,
                        [`${entity}QuestionId`]: question.id,
                    });
                } else {
                    answers.push({
                        ...rcAnswer,
                        [`${entity}QuestionId`]: question.id,
                    });
                }
            });
            results.push({
                end: store.endDateTimes[progressIndex],
                start: store.startDateTimes[progressIndex],
                answers,
                [`${entity}Id`]: question.id,
            });
        });
        return results;
    };

    const getTestStatistics = () => {
        const {
            vocabularyTest,
            readingComprehensionTest,
            clozeTest,
            writingTest,
        } = stepStores;
        return {
            resultsVocabulary: getResult(vocabularyTest, 'vocabulary'),
            resultsWriting: getNestedResult(writingTest, 'writing'),
            resultsRc: getNestedResultsWithSubQuestions(readingComprehensionTest, 'rc'),
            resultsCloze: getNestedResultsWithSubQuestions(clozeTest, 'cloze'),
        };
    };

    const saveTestSession = testStatistics => {
        const session = {
            testId,
            userId,
            name: `${sessionName} - ${displayName} - ${new Date().toISOString()}`,
            startDatetime,
            endDatetime: new Date().toISOString(),
            ...testStatistics,
        };
        return testSessionService.add(session);
    };

    const onEvaluate = async () => {
        try {
            startFetch();
            const testStatistics = getTestStatistics();
            const savedTestSession = await saveTestSession(testStatistics);
            endTestWizardSession(savedTestSession);
        } catch (err) {
            setError(_.get(err, 'response.status', true) || true);
        } finally {
            endFetch();
        }
    };

    const getMarks = storeName => {
        const result = _.get(stepStores, [storeName, 'result'], { total: 0, score: 0 });
        const marks = !_.isNil(result.score) && !_.isNil(result.total) ? `${result.score}/${result.total}` : null;
        return marks;
    };

    const resultsEvaluated = !_.isNil(endDatetime);

    return !resultsEvaluated ? (
        <Introduction
            buttonTitle={error ? 'Resubmit Test' : 'Submit Test'}
            introductionText={
                error
                    ? 'An error has occured and your test has not been saved, please resubmit your test.'
                    : 'Submit your test scores to be evaluated.'
            }
            onEvaluateClick={onEvaluate}
        />
    ) : (
        <div className='test-wizard-result'>
            <Title />
            {_.map(testSteps, (step, index) => {
                const testStatistics = _.get(stepStores, [step.storeName], {});
                const pending = _.isEmpty(_.get(stepStores, `${step.storeName}.result`));
                return (
                    <ResultPanel
                        key={index}
                        marks={getMarks(step.storeName)}
                        pending={pending}
                        title={`${step.title}`}
                    >
                        <ResultStatistics
                            endDatetime={testStatistics.endDatetime}
                            pending={pending}
                            result={testStatistics.result}
                            startDatetime={testStatistics.startDatetime}
                        />
                    </ResultPanel>
                );
            })}
        </div>
    );
}
