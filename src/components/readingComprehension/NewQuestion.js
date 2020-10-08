import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import PicklistField from '../form/fields/PicklistField';
import Field from '../form/fields/Field';
import NumberField from '../form/fields/NumberField';
import { useForm, useEffect, useState, useRef } from '../../hooks';

function NewQuestion({ onAdd, totalQuestions }) {
    const controls = useForm();
    const [loading, setLoading] = useState(false);
    const [lastIndex, setLastIndex] = useState(totalQuestions + 1);
    const lastIndexRef = useRef(null);
    lastIndexRef.current = lastIndex;
    const getLastIndex = () => lastIndexRef.current;
    useEffect(() => {
        setLastIndex(totalQuestions + 1);
        if (controls.getValues('sequence')) {
            controls.setValue('sequence', getLastIndex());
        }
    }, [totalQuestions, controls]);
    return (
        <Paper >
            <ExpansionPanelDetails className='reading-comprehension-question-details'>
                {!_.isEmpty(controls.errors) && <div className='field-error mt-3 mb-3'>Fields marked with * must be filled out</div>}
                <NumberField
                    controls={controls}
                    field={{
                        defaultValue: getLastIndex(),
                        name: 'sequence',
                        label: 'Sequence',
                        helperText: 'The order in which you would like this question to appear (should not exceed total number of questions)',
                        variant: 'outlined',
                        fullWidth: true,
                        onChange: _.debounce(value => {
                            value = _.parseInt(value);
                            if (value <= 0) {
                                controls.setValue('sequence', getLastIndex());
                            } else if (value > getLastIndex()) {
                                controls.setValue('sequence', getLastIndex());
                            }
                        }, 500, { leading: false, trailing: true }),
                    }}
                />
                <Field
                    controls={controls}
                    field={{
                        name: 'text',
                        label: 'Question',
                        variant: 'outlined',
                        fullWidth: true,
                        required: true,
                    }}
                >
                    <TextField />
                </Field>
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
                        fullWidth: true,
                    }}
                />
                <NumberField
                    controls={controls}
                    field={{
                        name: 'correct',
                        label: 'Correct',
                        variant: 'outlined',
                        required: true,
                        fullWidth: true,
                    }}
                />
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
                {loading && (
                    <CircularProgress
                        color='inherit'
                        size={20}
                    />
                )}
                <Button
                    color='primary'
                    onClick={async () => {
                        const add = controls.handleSubmit(onAdd);
                        setLoading(true);
                        await add();
                        if (_.isEmpty(controls.errors)) {
                            controls.reset({
                                sequence: undefined,
                                text: undefined,
                                options: [],
                                correct: undefined,
                            }, { errors: true });
                        }
                        // Aesthetic spinner.
                        setTimeout(() => {
                            setLoading(false);
                        }, 250);
                    }}
                    size='small'
                >
                    Add Question
                </Button>
            </ExpansionPanelActions>
        </Paper>
    );
}

NewQuestion.propTypes = {
    totalQuestions: PropTypes.number.isRequired,
    onAdd: PropTypes.func,
};

NewQuestion.defaultProps = { onAdd: _.noop };

export default NewQuestion;
