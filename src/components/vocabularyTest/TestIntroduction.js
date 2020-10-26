import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const TestIntroduction = ({ onStartClick, total }) => (
    <div className='vocabulary-test-introduction'>
        <div className='mt-4'>
            <p className='mb-4'>
                The quiz contains
                {' '}
                <b>{total}</b>
                {' '}
                vocabulary questions.
            </p>
            <p className='mb-4'>
                During the quiz, you will see each vocabulary question
                {' '}
                <b>only one at a time</b>
                .
            </p>
            <p className='mb-4'><b>You will not be able to go back to previous questions and change your answer.</b></p>
            <p className='mb-4'>
                <b>Please answer every question</b>
                --if you are not certain about the answer,
                {' '}
                <b>make your best guess</b>
                .
            </p>
        </div>
        <Button
            className='my-3'
            color='primary'
            onClick={onStartClick}
            variant='contained'
        >
            Start Vocabulary Test
        </Button>
    </div>
);

TestIntroduction.propTypes = {
    onStartClick: PropTypes.func.isRequired,
    total: PropTypes.number,
};

TestIntroduction.defaultProps = { total: 'Unknown' };

export default TestIntroduction;
