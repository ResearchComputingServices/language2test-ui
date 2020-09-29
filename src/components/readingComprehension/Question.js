import _ from 'lodash';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import PicklistField from '../form/fields/PicklistField';
import Field from '../form/fields/Field';
import NumberField from '../form/fields/NumberField';
import { useForm, useState } from '../../hooks';

function Question({
    sequence,
    text,
    correct,
    options,
    onUpdate,
    onRemove,
}) {
    const controls = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        controls.reset({
            text,
            correct,
            options: _.map(options, option => _.get(option, 'text')),
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, correct, options]);

    return (
        <div className='reading-comprehension-question-container'>
            <ExpansionPanel
                className='reading-comprehension-question-expansion-panel'
                defaultExpanded
            >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className='reading-comprehension-question-heading'>
                        {`${sequence ? `${sequence}.  ` : ''}${text ? `"${text}"` : 'Add Question'}`}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className='reading-comprehension-question-details'>
                    {!_.isEmpty(controls.errors) && <div className='field-error mb-3'>Fields marked with * must be filled out</div>}
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
                            setLoading(true);
                            const update = controls.handleSubmit(onUpdate);
                            await update();
                            // For aesthetics
                            setTimeout(() => {
                                setLoading(false);
                            }, 250);
                        }}
                        size='small'
                    >
                        Update
                    </Button>
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
    text: PropTypes.string,
    correct: PropTypes.number,
    options: PropTypes.array,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func,
    sequence: PropTypes.number,
};

Question.defaultProps = {
    text: undefined,
    correct: undefined,
    options: undefined,
    sequence: undefined,
    onRemove: _.noop,
    onUpdate: _.noop,
};

export default Question;
