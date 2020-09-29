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
import PicklistField from '../form/fields/PicklistField';
import NumberField from '../form/fields/NumberField';
import Checkbox from '../form/fields/Checkbox';
import { useForm, useState } from '../../hooks';

function Question({
    sequence,
    correct,
    options,
    typed,
    onUpdate,
    onRemove,
    children,
}) {
    const controls = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        controls.reset({
            correct,
            options: _.map(options, option => _.get(option, 'text')),
            typed: !!typed,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [correct, options, typed]);

    return (
        <div className='cloze-question-container'>
            <ExpansionPanel
                className='cloze-question-expansion-panel'
                defaultExpanded
            >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className='cloze-question-heading'>
                        {`${sequence ? `${sequence}.  ` : ''}`}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className='cloze-question-details'>
                    {!_.isEmpty(controls.errors) && <div className='field-error mb-3'>Fields marked with * must be filled out</div>}
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
                    <Checkbox
                        controls={controls}
                        field={{
                            name: 'typed',
                            label: 'Typed',
                        }}
                    />
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <div className='cloze-question-children'>
                        {children}
                    </div>
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
    correct: PropTypes.number,
    options: PropTypes.array,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func,
    sequence: PropTypes.number,
    children: PropTypes.node,
    typed: PropTypes.bool,
};

Question.defaultProps = {
    correct: undefined,
    options: [],
    sequence: undefined,
    typed: undefined,
    onRemove: _.noop,
    onUpdate: _.noop,
    children: undefined,
};

export default Question;
