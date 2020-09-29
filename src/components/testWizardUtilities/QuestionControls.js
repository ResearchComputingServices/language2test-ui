import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../common';
import QuestionPagination from './QuestionPagination';

function QuestionControls({
    children,
    title,
    count,
    page,
    onChange,
    onNextClick,
    onPreviousClick,
    disableNext,
    disablePrevious,
    answers,
}) {
    return (
        <div>
            <div className='question-controls-title'>
                {title}
            </div>
            <QuestionPagination
                answers={answers}
                className='mt-5'
                count={count}
                onChange={onChange}
                page={page}
            />
            <div className='question-controls-content'>
                {children}
            </div>
            <div className='mt-3 mb-3'>
                <Button
                    color='primary'
                    disabled={disablePrevious}
                    onClick={onPreviousClick}
                    variant={undefined}
                >
                    Previous Question
                </Button>
                <Button
                    className='mr-3'
                    color='primary'
                    disabled={disableNext}
                    onClick={onNextClick}
                    variant={undefined}
                >
                    Next Question
                </Button>
            </div>
        </div>
    );
}

QuestionControls.propTypes = {
    count: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    page: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired,
    onPreviousClick: PropTypes.func.isRequired,
    disableNext: PropTypes.bool.isRequired,
    disablePrevious: PropTypes.bool.isRequired,
    answers: PropTypes.array,
    title: PropTypes.string,
};

QuestionControls.defaultProps = {
    answers: [],
    title: 'Please answer the following questions:',
};

export default QuestionControls;
