import _ from 'lodash';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TestContainer from './TestContainer';
import TestIntroduction from '../testWizardUtilities/TestIntroduction';
import Text from './Text';
import Blank from './Blank';
import {
    useStore,
    useActions,
    useStoreAttribute,
} from '../../hooks';

export default function() {
    const [clozeText, setClozeText] = useState([]);
    const cloze = useStore('clozeTest');
    const { confirmed: dialogConfirmed, canceled: dialogCanceled } = useStore('dialog');
    const clozeActions = useActions('clozeTest');
    const timerActions = useActions('timer');
    const timerActive = useStoreAttribute('timer', 'timerActive');
    const { showDialog, hideDialog } = useActions('dialog');
    const clozeRef = useRef(null);
    const clozeTextRef = useRef(null);
    clozeTextRef.current = clozeText;
    clozeRef.current = cloze;

    const getQuestions = useCallback(() => _.get(clozeRef.current, 'questions', []), [clozeRef]);

    const getAnswers = useCallback(() => _.get(clozeRef.current, 'answers', []), [clozeRef]);

    const getProgress = () => _.get(clozeRef.current, 'progress', 'not-started');

    const getProgressIndex = useCallback(() => _.get(clozeRef.current, 'progressIndex', 0), [clozeRef]);

    const getCurrentSubAnswers = useCallback(() => getAnswers()[getProgressIndex()] || [], [getAnswers, getProgressIndex]);

    const getCurrentQuestion = () => getQuestions()[getProgressIndex()] || {};

    const getCurrentSubQuestion = index => _.get(getCurrentQuestion(), 'questions', [])[index] || {};

    const getTotalQuestionsCount = useCallback(() => _.size(getQuestions()), [getQuestions]);

    const getCurrentQuestionTimeLimit = () => _.get(getCurrentQuestion(), 'timeLimit', 60 * 10);

    const answer = (index, answer) => {
        const answers = [...getCurrentSubAnswers()];
        const newSubAnswer = {
            text: answer,
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            attempted: true,
            seen: true,
        };
        answers[index] = newSubAnswer;
        const totalAnswers = [...getAnswers()];
        totalAnswers[getProgressIndex()] = answers;
        clozeActions.setAnswers(totalAnswers);
    };

    const onStartClick = async () => {
        clozeActions.startTest();
    };

    const onPreviousClick = () => {
        clozeActions.previousQuestion();
    };

    const next = useCallback(() => {
        clozeActions.nextQuestion();
        // TODO There should be a better way of doing this.
        // We are basically skipping the time difference check by clearing the timestamp, might seem like a hack in the design.
        timerActions.clearTimestamp();
        if (getProgressIndex() >= getTotalQuestionsCount() - 1) {
            timerActions.endTimer();
            clozeActions.endTest();
        }
    }, [getProgressIndex, getTotalQuestionsCount, clozeActions, timerActions]);

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
    const formatText = text => {
        if (!_.isString(text)) return '';
        const blankDashes = uuidv4();
        const indicesWithBlanks = [];
        let newText = '';
        let segment = '';
        let bracketOpen = false;
        for (let i = 0; i < text.length; ++i) {
            const word = text[i];
            if (word === '*' && !bracketOpen) {
                newText += segment;
                segment = '';
                bracketOpen = true;
            } else if (word === '*' && bracketOpen) {
                newText += blankDashes;
                segment = '';
                bracketOpen = false;
            } else {
                segment += word;
            }
        }
        text = newText + segment;
        // After inserting the blank dashes we split the text and create an array without them.
        text = text.split(blankDashes);
        const formattedText = [];
        // We loop over this array and create a new array with blanks being underlined and storing the indices of the blanks.
        _.each(text, (word, index) => {
            let firstLetterHint = '';
            // After splitting the text by blank dashes we check if the last word of each splitted string is a hint.
            // For it to be a hint it needs to be a letter and not an empty string and must have an empty string before it.
            if (word[word.length - 1] !== '' && word[word.length - 2] === ' ') {
                // If it is then it's our first letter hint!
                firstLetterHint = word[word.length - 1];
                // Therefore we need to make sure we remove it from the actual word as it needs to go inside the blank.
                word = word.substring(0, word.length - 1);
            }
            formattedText.push(word);
            if (index !== text.length - 1) {
                // Index position in which the word will get pushed will be the length of the current text.
                indicesWithBlanks.push(formattedText.length);
                const currentQuestion = getCurrentSubQuestion(index);
                const currentAnswer = getCurrentSubAnswers()[index];
                formattedText.push(
                    (
                        <Blank
                            key={index}
                            defaultValue={currentAnswer ? currentAnswer.text : ''}
                            hint={firstLetterHint}
                            onChange={_.debounce(value => answer(index, value), 250, { leading: false, trailing: true })}
                            options={currentQuestion.options}
                            typed={currentQuestion.typed}
                        />
                    ),
                );
            }
        });
        return formattedText;
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
        // Progress index changed meaning it's either a new question or we are initializing a question.
        const currentQuestion = getCurrentQuestion();
        setClozeText(formatText(currentQuestion.text));
        timerActions.startTimer(getCurrentQuestionTimeLimit());
    // TODO - We are potentially making React Guru's angry by disabling this lint. Must revisit in the future.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cloze.progressIndex]);

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

        return {
            'not-started': <TestIntroduction
                buttonTitle='Start the Test'
                introductionText='Please start the cloze test whenever you are ready.'
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
                                    <Text
                                        filename={currentQuestion.filename}
                                        type={currentQuestion.type}
                                    >
                                        {clozeText}
                                    </Text>
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
