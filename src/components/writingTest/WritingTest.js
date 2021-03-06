import _ from 'lodash';
import React, { useEffect } from 'react';
import TestIntroduction from './TestIntroduction';
import TestContainer from './TestContainer';
import Question from './Question';
import {
    useActions,
    useStore,
    useStoreAttribute,
} from '../../hooks';
import WordLimitTextArea from './WordLimitTextArea';

export default function() {
    const writing = useStore('writingTest');
    const writingActions = useActions('writingTest');
    const timerActions = useActions('timer');
    const timerActive = useStoreAttribute('timer', 'timerActive');

    const getQuestions = () => _.get(writing, 'questions', []);

    const getAnswers = () => _.get(writing, 'answers', []);

    const getProgressIndex = () => _.get(writing, 'progressIndex', 0);

    const getProgress = () => _.get(writing, 'progress', 'not-started');

    const getCurrentQuestion = () => getQuestions()[getProgressIndex()] || {};

    const getTotalQuestionsCount = () => _.size(getQuestions());

    const getCurrentQuestionTimeLimit = () => _.get(getCurrentQuestion(), 'timeLimit', 60 * 15);

    const getAnswer = progressIndex => getAnswers()[progressIndex] || {};

    const getCurrentAnswer = () => getAnswers()[getProgressIndex()] || {};

    const getCurrentAnswerText = () => _.get(getCurrentAnswer(), 'text', '');

    const setAnswerMetadata = (metadata, progressIndex = getProgressIndex()) => {
        const answers = [...getAnswers()];
        answers[progressIndex] = {
            ...getAnswer(progressIndex),
            ...metadata,
        };
        writingActions.setAnswers(answers);
    };

    const answer = (progressIndex = getProgressIndex()) => {
        const answers = [...getAnswers()];
        const originalAnswer = getAnswer(progressIndex);
        answers[progressIndex] = {
            ...originalAnswer,
            endTime: new Date().toISOString(),
            attempted: 'text' in originalAnswer,
        };
        if (progressIndex < getTotalQuestionsCount() - 1) {
            answers[progressIndex + 1] = {
                ...getAnswer(progressIndex + 1),
                startTime: new Date().toISOString(),
                seen: true,
            };
            writingActions.nextQuestion(answers);
        } else {
            writingActions.setAnswers(answers);
        }
    };

    const skipAnswer = (progressIndex = getProgressIndex()) => {
        if (progressIndex < getTotalQuestionsCount() - 1) {
            const answers = [...getAnswers()];
            answers[progressIndex + 1] = {
                ...getAnswer(progressIndex + 1),
                startTime: new Date().toISOString(),
                seen: true,
            };
            writingActions.nextQuestion(answers);
        }
    };

    const onStartClick = () => {
        writingActions.startTest();
        // Set the start time on the current answer when the test starts.
        setAnswerMetadata({
            startTime: new Date().toISOString(),
            seen: true,
        });
    };

    const onNextClick = userPrompt => {
        // TODO There should be a better way of doing this.
        // We are basically skipping the time difference check by clearing the timestamp, might seem like a hack in the design.
        timerActions.clearTimestamp();
        const progressIndex = getProgressIndex();
        if (progressIndex >= getTotalQuestionsCount() - 1) {
            timerActions.endTimer();
            writingActions.endTest();
        }
        // The userPrompt will be true if the onNextClick press is generated by user themselves.
        if (userPrompt) {
            answer();
        } else {
            skipAnswer();
        }
    };

    const onPreviousClick = () => writingActions.previousQuestion();

    const onAnswerChange = text => setAnswerMetadata({ text });

    useEffect(() => {
        timerActions.startTimer(getCurrentQuestionTimeLimit());
    // TODO - We are potentially making React Guru's angry by disabling this lint. Must revisit in the future.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [writing.progressIndex]);

    useEffect(() => {
        if (!timerActive && _.eq(getProgress(), 'in-progress')) {
            onNextClick();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerActive]);

    const getViewMap = () => {
        const currentQuestion = getCurrentQuestion();
        const total = getTotalQuestionsCount();
        const progressIndex = getProgressIndex();
        const current = total ? progressIndex + 1 : 0;
        const currentAnswerText = getCurrentAnswerText();

        return {
            'not-started': <TestIntroduction
                onStartClick={onStartClick}
                total={total}
            />,
            'in-progress': (
                <TestContainer
                    current={current}
                    onNextClick={onNextClick}
                    onPreviousClick={onPreviousClick}
                    total={total}
                >
                    {
                        current
                            ? (
                                <Question
                                    filename={currentQuestion.filename}
                                    text={currentQuestion.question}
                                >
                                    <WordLimitTextArea
                                        onChange={onAnswerChange}
                                        value={currentAnswerText}
                                        wordLimit={currentQuestion.wordLimit}
                                    />
                                </Question>
                            )
                            : null
                    }
                </TestContainer>
            ),
        };
    };

    const progress = getProgress();
    const viewMap = getViewMap();
    return viewMap[progress];
}
