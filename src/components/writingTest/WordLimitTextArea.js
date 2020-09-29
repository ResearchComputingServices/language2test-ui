import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import _ from 'lodash';

function WordLimitTextArea({
    wordLimit,
    onChange,
    disabled,
    value,
}) {
    const getWordLength = value => _.compact(value.split(' ').join('\n').split('\n')).length;
    let height = wordLimit / 25;
    if (height < 5) {
        height = 5;
    }
    return (
        <TextField
            className='writing-test-word-limit-text-area'
            disabled={disabled}
            helperText={`${getWordLength(value)}/${wordLimit}`}
            margin='normal'
            multiline
            onChange={event => {
                const value = _.get(event, 'target.value');
                if (getWordLength(value) > wordLimit) return;
                if (_.isFunction(onChange)) {
                    onChange(value);
                }
            }}
            rows={height}
            value={value}
            variant='outlined'
        />
    );
}

WordLimitTextArea.propTypes = {
    wordLimit: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
};

WordLimitTextArea.defaultProps = {
    value: '',
    disabled: false,
    onChange: undefined,
};

export default WordLimitTextArea;
