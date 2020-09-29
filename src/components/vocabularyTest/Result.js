import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import QuestionOptions from '../testWizardUtilities/QuestionOptions';
import QuestionOption from '../testWizardUtilities/QuestionOption';
import ResultMetadata from '../result/ResultMetadata';

function Result({ questions, result }) {
    const getAnswers = result => _.get(_.first(result), 'answers', []);

    const getAnswer = (answers, index) => (_.isArray(answers) && answers[index]) || {};

    const getCorrectAnswer = question => _.get(_.isArray(_.get(question, 'options')) && question.options[question.correct - 1], 'text', '');

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
        <div className='d-flex flex-wrap justify-content-center'>
            {_.map(questions, (question, index) => {
                const answer = getAnswer(getAnswers(result), index);
                const answerText = _.get(answer, 'text', '');
                const correctAnswer = getCorrectAnswer(question);
                const answeredCorrectly = getAnsweredCorrectly(answer);
                const seen = _.get(answer, 'seen');
                const attempted = _.get(answer, 'attempted');
                const startTime = _.get(answer, 'startTime');
                const endTime = _.get(answer, 'endTime');
                return (
                    <QuestionCard
                        key={index}
                        difficulty={question.difficulty}
                        endTime={endTime}
                        seen={seen}
                        sequence={index + 1}
                        size='small'
                        startTime={startTime}
                        word={question.word}
                    >
                        <ResultMetadata
                            answeredCorrectly={answeredCorrectly}
                            attempted={attempted}
                            endTime={endTime}
                            seen={seen}
                            startTime={startTime}
                        />
                        <QuestionOptions answer={answerText}>
                            {_.map(question.options, (option, index) => (
                                <QuestionOption
                                    key={index}
                                    correct={isCorrectOption(option.text, answerText, correctAnswer)}
                                    disabled
                                    text={option.text}
                                />
                            ))}
                        </QuestionOptions>
                    </QuestionCard>
                );
            })}
        </div>
    );
}

Result.propTypes = {
    questions: PropTypes.array.isRequired,
    result: PropTypes.array.isRequired,
};

export default Result;
