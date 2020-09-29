import _ from 'lodash';
import React, { useEffect, useState, useCallback } from 'react';
import Divider from '@material-ui/core/Divider';
import TestContainer from './TestContainer';
import TestIntroduction from '../testWizardUtilities/TestIntroduction';
import Question from './Question';
import Reading from './Reading';
import QuestionControls from '../testWizardUtilities/QuestionControls';
import {
    useActions,
    useStore,
    useStoreAttribute,
} from '../../hooks';

export default function() {
    const [currentQuestionPage, setCurrentQuestionPage] = useState(1);
    const readingComprehension = useStore('readingComprehensionTest');
    const readingComprehensionActions = useActions('readingComprehensionTest');
    const timerActions = useActions('timer');
    const timerActive = useStoreAttribute('timer', 'timerActive');
    const { confirmed: dialogConfirmed, canceled: dialogCanceled } = useStore('dialog');
    const { showDialog, hideDialog } = useActions('dialog');

    const getQuestions = useCallback(() => _.get(readingComprehension, 'questions', []), [readingComprehension]);

    const getAnswers = useCallback(() => _.get(readingComprehension, 'answers', []), [readingComprehension]);

    const getProgress = () => _.get(readingComprehension, 'progress', 'not-started');

    const getProgressIndex = useCallback(() => _.get(readingComprehension, 'progressIndex', 0), [readingComprehension]);

    const getCurrentSubAnswers = useCallback(() => getAnswers()[getProgressIndex()] || [], [getAnswers, getProgressIndex]);

    const getCurrentSubAnswer = () => getCurrentSubAnswers()[currentQuestionPage - 1] || {};

    const getSubAnswers = useCallback(progressIndex => getAnswers()[progressIndex] || [], [getAnswers]);

    const getSubAnswer = useCallback((progressIndex, index) => getSubAnswers(progressIndex)[index] || {}, [getSubAnswers]);

    const getCurrentSubAnswerText = () => _.get(getCurrentSubAnswer(), 'text', null);

    const getCurrentQuestion = () => getQuestions()[getProgressIndex()] || {};

    const getCurrentSubQuestion = () => _.get(getCurrentQuestion(), 'questions', [])[currentQuestionPage - 1] || {};

    const getTotalQuestionsCount = useCallback(() => _.size(getQuestions()), [getQuestions]);

    const getTotalSubQuestionsCount = () => _.get(getCurrentQuestion(), 'questions.length');

    const getCurrentQuestionTimeLimit = () => _.get(getCurrentQuestion(), 'timeLimit', 60 * 10);

    const setAnswerMetadata = useCallback((metadata, index, progressIndex = getProgressIndex()) => {
        const answers = [...getSubAnswers(progressIndex)];
        answers[index] = {
            ...getSubAnswer(progressIndex, index),
            ...metadata,
        };
        const totalAnswers = [...getAnswers()];
        totalAnswers[progressIndex] = answers;
        readingComprehensionActions.setAnswers(totalAnswers);
    }, [getAnswers, getSubAnswers, getProgressIndex, getSubAnswer, readingComprehensionActions]);

    const answer = (index, answer) => {
        const answers = [...getCurrentSubAnswers()];
        const subAnswer = getCurrentSubAnswer();
        const newSubAnswer = {
            ...subAnswer,
            text: answer,
            endTime: new Date().toISOString(),
            attempted: !_.isEmpty(answer),
        };
        if ('$startTime' in subAnswer) {
            newSubAnswer.startTime = subAnswer.$startTime;
        }
        answers[index] = newSubAnswer;
        const totalAnswers = [...getAnswers()];
        totalAnswers[getProgressIndex()] = answers;
        const existingNextSubAnswer = getSubAnswer(getProgressIndex(), index + 1);
        if (index < getTotalSubQuestionsCount() - 1) {
            const nextSubAnswer = { ...existingNextSubAnswer };
            if ('startTime' in nextSubAnswer) {
                nextSubAnswer.$startTime = new Date().toISOString();
            } else {
                nextSubAnswer.startTime = new Date().toISOString();
                nextSubAnswer.seen = true;
            }
            answers[index + 1] = nextSubAnswer;
        }
        readingComprehensionActions.setAnswers(totalAnswers);
    };

    const onSubAnswerChange = value => {
        answer(currentQuestionPage - 1, value);
        if (!_.eq(currentQuestionPage, getTotalSubQuestionsCount())) {
            setCurrentQuestionPage(currentQuestionPage + 1);
        }
    };

    const onNextSubQuestion = () => {
        setCurrentQuestionPage(currentQuestionPage + 1);
    };

    const onPreviousSubQuestion = () => {
        setCurrentQuestionPage(currentQuestionPage - 1);
    };

    const onSubQuestionChange = (event, page) => {
        setCurrentQuestionPage(page);
        const subAnswer = getSubAnswer(getProgressIndex(), page - 1);
        // We set a temp timer.
        if ('startTime' in subAnswer) {
            setAnswerMetadata({ $startTime: new Date().toISOString() }, page - 1);
        } else {
            setAnswerMetadata({
                startTime: new Date().toISOString(),
                seen: true,
            }, page - 1);
        }
    };

    const onStartClick = async () => {
        readingComprehensionActions.startTest();
        setAnswerMetadata({
            startTime: new Date().toISOString(),
            seen: true,
        }, currentQuestionPage - 1);
    };

    const onPreviousClick = () => {
        readingComprehensionActions.previousQuestion();
        setCurrentQuestionPage(1);
    };

    const next = useCallback(() => {
        readingComprehensionActions.nextQuestion();
        setCurrentQuestionPage(1);
        // TODO There should be a better way of doing this.
        // We are basically skipping the time difference check by clearing the timestamp, might seem like a hack in the design.
        timerActions.clearTimestamp();
        if (getProgressIndex() >= getTotalQuestionsCount() - 1) {
            timerActions.endTimer();
            readingComprehensionActions.endTest();
        } else {
            setAnswerMetadata({
                startTime: new Date().toISOString(),
                seen: true,
            }, 0, getProgressIndex() + 1);
        }
    }, [getProgressIndex, getTotalQuestionsCount, readingComprehensionActions, setAnswerMetadata, timerActions]);

    const onNextClick = () => {
        const answers = getCurrentSubAnswers();
        const questions = _.get(getCurrentQuestion(), 'questions', []);
        if (_.isEmpty(answers)
            || !(_.eq(questions.length, answers.length))
            || _.some(answers, answer => _.isNil(_.get(answer, 'text')))
        ) {
            return showDialog({
                title: 'You have left some questions unanswered',
                text: 'You will not be able to revisit. Are you sure you want to proceed?',
            });
        }
        next();
    };

    useEffect(() => {
        if (dialogConfirmed) {
            next();
            hideDialog();
        }
    }, [dialogConfirmed, hideDialog, next]);

    useEffect(() => {
        if (dialogCanceled) {
            hideDialog();
        }
    }, [dialogCanceled, hideDialog]);

    useEffect(() => {
        timerActions.startTimer(getCurrentQuestionTimeLimit());
    // TODO - We are potentially making React Guru's angry by disabling this lint. Must revisit in the future.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [readingComprehension.progressIndex]);

    useEffect(() => {
        if (!timerActive && _.eq(getProgress(), 'in-progress')) {
            next();
        }
    // TODO React Gurus might be mad.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerActive]);

    const getViewMap = () => {
        const total = getTotalQuestionsCount();
        const progressIndex = getProgressIndex();
        const currentQuestion = getCurrentQuestion();
        const current = total ? progressIndex + 1 : 0;
        const currentSubQuestion = getCurrentSubQuestion();
        const currentSubAnswerText = getCurrentSubAnswerText();
        const totalSubQuestionsCount = getTotalSubQuestionsCount();
        const currentSubAnswers = getCurrentSubAnswers();

        return {
            'not-started': <TestIntroduction
                buttonTitle='Start the Test'
                introductionText='Please start the reading comprehension test whenever you are ready.'
                onStartClick={onStartClick}
            />,
            'in-progress': (
                <TestContainer
                    current={current}
                    onNextClick={onNextClick}
                    onPreviousClick={onPreviousClick}
                    total={total}
                >
                    {
                        current && !_.isEmpty(currentQuestion)
                            ? (
                                <>
                                    <Reading
                                        filename={currentQuestion.filename}
                                        text={currentQuestion.text}
                                        type={currentQuestion.type}
                                    />
                                    {!_.eq(totalSubQuestionsCount, 0) && (
                                        <>
                                            <Divider light />
                                            <QuestionControls
                                                answers={currentSubAnswers}
                                                count={totalSubQuestionsCount}
                                                disableNext={_.eq(currentQuestionPage, totalSubQuestionsCount)}
                                                disablePrevious={_.eq(currentQuestionPage, 1)}
                                                onChange={onSubQuestionChange}
                                                onNextClick={onNextSubQuestion}
                                                onPreviousClick={onPreviousSubQuestion}
                                                page={currentQuestionPage}
                                            >
                                                <Question
                                                    key={`${progressIndex}-${currentQuestionPage}`}
                                                    answer={currentSubAnswerText}
                                                    onAnswerChange={(e, val) => onSubAnswerChange(val)}
                                                    options={currentSubQuestion.options}
                                                    title={currentSubQuestion.text}
                                                />
                                            </QuestionControls>
                                        </>
                                    )}
                                </>
                            )
                            : null
                    }
                </TestContainer>
            ),
        };
    };

    const progress = getProgress();
    const viewMap = getViewMap();
    return (
        <>
            {viewMap[progress]}
        </>
    );
}
