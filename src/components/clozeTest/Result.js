import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import Text from './Text';
import QuestionOptions from '../testWizardUtilities/QuestionOptions';
import QuestionOption from '../testWizardUtilities/QuestionOption';
import ResultMetadata from '../result/ResultMetadata';

const Result = ({ questions, result }) => _.map(questions, (question, index) => {
    const subResult = result[index];

    const getAnswers = result => _.get(result, 'answers', []);

    const getAnswer = (answers, index) => (_.isArray(answers) && answers[index]) || {};

    const getCorrectAnswer = question => {
        const options = _.get(question, 'options', []);
        const correct = _.get(question, 'correct');
        const correctAnswer = options[correct - 1] || {};
        return correctAnswer.text || '';
    };

    const getAnsweredCorrectly = answer => _.get(answer, 'answeredCorrectly', null);

    const getQuestionOptions = question => _.get(question, 'options', []);

    const isAnswerInOptions = (question, answer) => _.some(getQuestionOptions(question), option => _.eq(option.text, answer.text));

    const isCorrectOption = (option, answer, correctAnswer) => {
        if (_.eq(option, answer)) {
            return _.eq(answer, correctAnswer);
        }
        if (_.eq(option, correctAnswer)) {
            return _.eq(option, correctAnswer);
        }
    };

    return (
        <QuestionCard
            key={index}
            sequence={index + 1}
        >
            <Text
                filename={question.filename}
                type={question.type}
            >
                {question.text}
            </Text>
            {
                _.map(question.questions, (subQuestion, index) => {
                    const options = getQuestionOptions(subQuestion);
                    const answer = getAnswer(getAnswers(subResult), index);
                    const answerText = _.get(answer, 'text', '');
                    const correctAnswer = getCorrectAnswer(subQuestion);
                    const answeredCorrectly = getAnsweredCorrectly(answer);
                    const seen = _.get(answer, 'seen');
                    const attempted = _.get(answer, 'attempted');
                    const startTime = _.get(answer, 'startTime');
                    const endTime = _.get(answer, 'endTime');
                    const answerInOptions = isAnswerInOptions(subQuestion, answer);
                    return (
                        <div
                            key={index}
                            className='my-5'
                        >
                            <p className='h5 mb-4'>{`Question - ${index + 1}`}</p>
                            <ResultMetadata
                                answeredCorrectly={answeredCorrectly}
                                attempted={attempted}
                                endTime={endTime}
                                seen={seen}
                                startTime={startTime}
                            />
                            {!answerInOptions
                                        && !_.isNil(answerText)
                                        && !_.isEmpty(answerText)
                                        && <p className='my-4'>{`Typed Answer: "${answerText}"`}</p>}
                            <QuestionOptions
                                answer={answerText}
                            >
                                <div className='ml-1'>
                                    {_.map(options, (option, i) => (
                                        <QuestionOption
                                            key={i}
                                            correct={isCorrectOption(option.text, answerText, correctAnswer)}
                                            disabled
                                            text={option.text}
                                        />
                                    ))}
                                </div>
                            </QuestionOptions>
                        </div>
                    );
                })
            }
        </QuestionCard>
    );
});

Result.propTypes = {
    questions: PropTypes.array.isRequired,
    result: PropTypes.array.isRequired,
};

export default Result;
