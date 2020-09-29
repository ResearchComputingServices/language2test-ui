import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import _ from 'lodash';

function Question({
    title,
    options,
    onAnswerChange,
    answer,
}) {
    return (
        <div>
            <div className='reading-comprehension-test-question-text mb-5'>
                {`${title}`}
            </div>
            <Autocomplete
                getOptionLabel={option => option}
                getOptionSelected={(option, value) => _.eq(option, value)}
                onChange={(...args) => {
                    onAnswerChange(...args);
                    return args[1];
                }}
                options={_.map(options, option => option.text)}
                renderInput={params => (
                    <TextField
                        {...params}
                        label='Answer'
                        variant='outlined'
                    />
                )}
                value={answer}
            />
        </div>
    );
}

Question.propTypes = {
    title: PropTypes.string,
    options: PropTypes.array,
    onAnswerChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    answer: PropTypes.string,
};

Question.defaultProps = {
    title: '',
    options: [],
    disabled: false,
    answer: null,
};

export default Question;
