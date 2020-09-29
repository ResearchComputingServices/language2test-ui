import React from 'react';
import PropTypes from 'prop-types';
import CorrectIcon from '@material-ui/icons/Check';
import IncorrectIcon from '@material-ui/icons/Clear';
import IndecisiveIcon from '@material-ui/icons/Help';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import _ from 'lodash';

function QuestionOption({
    disabled,
    text,
    correct,
    indecisive,
}) {
    const placeIcon = () => {
        if (_.eq(indecisive, true)) return <IndecisiveIcon className='indicisive-icon' />;
        if (!_.isNil(correct)) {
            return correct
                ? <CorrectIcon className='correct-icon' />
                : <IncorrectIcon className='incorrect-icon' />;
        }
        return null;
    };
    return (
        <div>
            <FormControlLabel
                control={<Radio />}
                disabled={disabled}
                label={text}
                value={text}
            />
            {placeIcon()}
        </div>
    );
}

QuestionOption.propTypes = {
    correct: PropTypes.bool,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    indecisive: PropTypes.bool,
};

QuestionOption.defaultProps = {
    correct: undefined,
    disabled: false,
    indecisive: false,
    text: '',
};

export default QuestionOption;
