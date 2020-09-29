import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import WordLimitTextArea from './WordLimitTextArea';
import ResultMetadata from '../result/ResultMetadata';

function Result({ questions, result }) {
    const getResult = (result, index) => result[index] || {};

    const getAnswer = result => _.get(result, 'answer', {});

    return _.map(questions, (question, index) => {
        const answer = getAnswer(getResult(result, index));
        const answerText = _.get(answer, 'text', '') || '';
        const seen = _.get(answer, 'seen');
        const attempted = _.get(answer, 'attempted');
        const startTime = _.get(answer, 'startTime');
        const endTime = _.get(answer, 'endTime');

        return (
            <Question
                key={index}
                filename={question.filename}
                sequence={index + 1}
                text={question.question}
                type={question.type}
            >
                <ResultMetadata
                    attempted={attempted}
                    endTime={endTime}
                    seen={seen}
                    startTime={startTime}
                />
                <WordLimitTextArea
                    disabled
                    value={answerText}
                    wordLimit={question.wordLimit}
                />
            </Question>
        );
    });
}

Result.propTypes = {
    questions: PropTypes.array.isRequired,
    result: PropTypes.array.isRequired,
};

export default Result;
