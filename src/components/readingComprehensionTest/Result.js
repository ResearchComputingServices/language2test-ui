import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import Reading from './Reading';
import QuestionOptions from '../testWizardUtilities/QuestionOptions';
import QuestionOption from '../testWizardUtilities/QuestionOption';
import ResultMetadata from '../result/ResultMetadata';

const Result = ({ questions, result }) => _.map(questions, (question, index) => {
    const subResult = result[index];

    const getAnswers = result => _.get(result, 'answers', []);

    const getAnswer = (answers, index) => (_.isArray(answers) && answers[index]) || {};

    const getCorrectAnswer = question => _.get(
        _.isArray(_.get(question, 'options')) && question.options[question.correct], 'text', '',
    );

    const getAnsweredCorrectly = answer => _.get(answer, 'answeredCorrectly', null);

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
            <Reading
                filename={question.filename}
                text={question.text}
                type={question.type}
            />
            {
                _.map(question.questions, (subQuestion, index) => {
                    const answer = getAnswer(getAnswers(subResult), index);
                    const answerText = _.get(answer, 'text', '');
                    const correctAnswer = getCorrectAnswer(subQuestion);
                    const answeredCorrectly = getAnsweredCorrectly(answer);
                    const seen = _.get(answer, 'seen');
                    const attempted = _.get(answer, 'attempted');
                    const startTime = _.get(answer, 'startTime');
                    const endTime = _.get(answer, 'endTime');
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
                            <QuestionOptions
                                key={index}
                                answer={answerText}
                            >
                                <div className='ml-1'>
                                    {_.map(subQuestion.options, (option, i) => (
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
