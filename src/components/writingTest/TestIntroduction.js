import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const TestIntroduction = ({ onStartClick, total }) => (
    <div className='writing-test-introduction'>
        <div className='mt-4'>
            <p className='mb-4'>
                The quiz contains
                {' '}
                <b>{total}</b>
                {' '}
                Writing(s).
            </p>
            <p className='mb-4'>
                During the quiz, you will see each writing
                {' '}
                <b>only one at a time</b>
                .
            </p>
            <p className='mb-4'><b>You will not be able to go back to the previous writing once you have completed it.</b></p>
        </div>
        <Button
            className='my-3'
            color='primary'
            onClick={onStartClick}
            variant='contained'
        >
            Start Writing Test
        </Button>
    </div>
);

TestIntroduction.propTypes = {
    onStartClick: PropTypes.func.isRequired,
    total: PropTypes.number,
};

TestIntroduction.defaultProps = { total: 'Unknown' };

export default TestIntroduction;
