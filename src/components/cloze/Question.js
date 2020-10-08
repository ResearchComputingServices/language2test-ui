import _ from 'lodash';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { useForm } from 'react-hook-form';
import PicklistField from '../form/fields/PicklistField';
import NumberField from '../form/fields/NumberField';
import Checkbox from '../form/fields/Checkbox';

function Question({
    sequence,
    text,
    correct,
    options,
    typed,
    acceptedAnswers,
    onRemove,
}) {
    const controls = useForm();
    const typedWatch = controls.watch('typed');

    useEffect(() => {
        if (typedWatch) {
            if (_.isNil(acceptedAnswers) || _.isEmpty(acceptedAnswers)) {
                controls.setValue('acceptedAnswers', [text]);
            }
        } else if (_.eq(typedWatch, false)) {
            if (_.isNil(options) || _.isEmpty(options)) {
                controls.setValue('options', [text]);
                controls.setValue('correct', 1);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typedWatch]);

    useEffect(() => {
        controls.reset({
            acceptedAnswers: _.map(acceptedAnswers, acceptedAnswer => _.get(acceptedAnswer, 'text')),
            correct,
            options: _.map(options, option => _.get(option, 'text')),
            typed: !!typed,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [correct, options, acceptedAnswers, typed]);

    const title = `${sequence}. "${text}"`;
    return (
        <div className='cloze-question-container'>
            <ExpansionPanel
                className='cloze-question-expansion-panel'
                defaultExpanded
            >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className='cloze-question-heading'>
                        {title}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className='cloze-question-details'>
                    {!_.isEmpty(controls.errors) && <div className='field-error mb-3'>Fields marked with * must be filled out</div>}
                    {!(!_.isNil(typedWatch) ? typedWatch : typed) && (
                        <PicklistField
                            controls={controls}
                            field={{
                                name: 'options',
                                label: 'Options',
                                variant: 'outlined',
                                required: true,
                                multiple: true,
                                freeSolo: true,
                                options: [],
                                disabled: true,
                            }}
                        />
                    )}
                    {(!_.isNil(typedWatch) ? typedWatch : typed) && (
                        <PicklistField
                            controls={controls}
                            field={{
                                name: 'acceptedAnswers',
                                label: 'Accepted Answers',
                                variant: 'outlined',
                                required: true,
                                multiple: true,
                                freeSolo: true,
                                options: [],
                                disabled: true,
                            }}
                        />
                    )}
                    {!(!_.isNil(typedWatch) ? typedWatch : typed) && (
                        <NumberField
                            controls={controls}
                            field={{
                                name: 'correct',
                                label: 'Correct',
                                variant: 'outlined',
                                required: true,
                                fullWidth: true,
                                disabled: true,
                            }}
                        />
                    )}
                    <Checkbox
                        controls={controls}
                        field={{
                            name: 'typed',
                            label: 'Typed',
                            disabled: true,
                        }}
                    />
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <Button
                        onClick={onRemove}
                        size='small'
                    >
                        Remove
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        </div>
    );
}

Question.propTypes = {
    correct: PropTypes.number,
    options: PropTypes.array,
    onRemove: PropTypes.func,
    sequence: PropTypes.number.isRequired,
    typed: PropTypes.bool,
    text: PropTypes.string,
    acceptedAnswers: PropTypes.array,
};

Question.defaultProps = {
    correct: undefined,
    options: [],
    typed: undefined,
    onRemove: _.noop,
    acceptedAnswers: [],
    text: '',
};

export default Question;
