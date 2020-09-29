import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import PropTypes from 'prop-types';

function QuestionOptions({
    onAnswerChange,
    answer,
    children,
}) {
    return (
        <RadioGroup
            className='choices'
            name='options'
            onChange={onAnswerChange}
            value={answer}
        >
            {children}
        </RadioGroup>
    );
}

QuestionOptions.propTypes = {
    answer: PropTypes.string,
    onAnswerChange: PropTypes.func,
    children: PropTypes.node.isRequired,
};

QuestionOptions.defaultProps = {
    answer: undefined,
    onAnswerChange: undefined,
};

export default QuestionOptions;
