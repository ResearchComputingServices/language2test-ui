import _ from 'lodash';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { v4 as uuidv4 } from 'uuid';
import useInteractiveTextEditor from './useInteractiveTextEditor';
import Blank from '../clozeTest/Blank';

function InteractiveTextEditor({ controls }) {
    const text = controls.getValues('text');
    const {
        getText,
        getValue,
        getEditMode,
        getTextarea,
        setTextarea,
        setText,
        setValue,
        setEditMode,
    } = useInteractiveTextEditor(text);

    useEffect(() => {
        if (!_.isNil(getText()) && !_.isEmpty(getText())) {
            controls.setValue('text', getText());
            setTextarea(getText());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getText()]);

    useEffect(() => {
        if (!_.isNil(getTextarea()) && !_.isEmpty(getTextarea())) {
            controls.setValue('text', getTextarea());
            setText(getTextarea());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTextarea()]);

    useEffect(() => {
        setText(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onEdit = () => {
        setEditMode(true);
    };

    const onEditRemove = () => {
        setEditMode(false);
    };

    const onChangeTextarea = event => {
        const { value } = event.target;
        setTextarea(value);
    };

    const formatText = text => {
        if (!_.isString(text)) return '';
        const blankDashes = uuidv4();
        const indicesWithBlanks = [];
        let newText = '';
        let segment = '';
        let bracketOpen = false;
        const questions = [];
        for (let i = 0; i < text.length; ++i) {
            const letter = text[i];
            if (letter === '*' && !bracketOpen) {
                newText += segment;
                segment = '';
                bracketOpen = true;
            } else if (letter === '*' && bracketOpen) {
                newText += blankDashes;
                let hint = false;
                const previousLetter = getTextarea()[i - segment.length - 2] || '';
                const hasPreviousLetter = previousLetter !== ' ' && previousLetter !== '' && previousLetter !== '*';
                if (hasPreviousLetter) {
                    segment = previousLetter + segment;
                    hint = true;
                }
                const newWord = segment.replace('<typed/>', '');
                const typed = segment.length !== newWord.length;
                let optionBracketOpen = false;
                let optionSegment = '';
                let innerSegment = '';
                for (let i = 0; i < newWord.length; ++i) {
                    const letter = newWord[i];
                    if (letter === '<') {
                        optionBracketOpen = true;
                        continue;
                    }
                    if (letter === '>') {
                        optionBracketOpen = false;
                        continue;
                    }
                    if (optionBracketOpen) {
                        optionSegment += letter;
                    } else if (innerSegment !== '<' && innerSegment !== '>') {
                        innerSegment += letter;
                    }
                }
                const options = _.compact(optionSegment.split(',')).map(text => ({ text }));
                options.push({ text: innerSegment });
                questions.push({
                    hint,
                    typed,
                    text: innerSegment,
                    options,
                });
                segment = '';
                bracketOpen = false;
            } else {
                segment += letter;
            }
        }
        text = newText + segment;
        text = text.split(blankDashes);
        const formattedText = [];
        _.each(text, (segment, index) => {
            let firstLetterHint = '';
            if (segment[segment.length - 1] !== '' && segment[segment.length - 2] === ' ') {
                firstLetterHint = segment[segment.length - 1];
                segment = segment.substring(0, segment.length - 1);
            }
            formattedText.push(segment);
            if (index !== text.length - 1) {
                indicesWithBlanks.push(formattedText.length);
                formattedText.push(
                    (
                        <Blank
                            key={index}
                            defaultValue=''
                            hint={_.get(questions[index], 'typed') ? firstLetterHint : ''}
                            onChange={_.noop}
                            options={_.get(questions[index], 'typed') ? [] : _.shuffle(_.get(questions[index], 'options'))}
                            typed={_.get(questions[index], 'typed')}
                        />
                    ),
                );
            }
        });
        return formattedText;
    };

    return (
        <>
            <div
                className='mt-2 mb-1'
            >
                <Paper>
                    <Tabs
                        onChange={handleChange}
                        value={getValue()}
                    >
                        <Tab
                            label='Cloze Text'
                            value='text'
                        />
                    </Tabs>
                </Paper>
                <div className='ml-3 mt-2'>
                    <div className='row mb-3'>
                        {getEditMode() && (
                            <Tooltip title='Stop Editing'>
                                <IconButton
                                    color='secondary'
                                    onClick={onEditRemove}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        {!getEditMode() && (
                            <Tooltip title='Edit'>
                                <IconButton
                                    color='secondary'
                                    onClick={onEdit}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>
                    <div className='cloze-interactive-text-editor-container'>
                        {!getEditMode() && (
                            <div className='cloze-interactive-text-editor-text'>
                                {formatText(getTextarea())}
                            </div>
                        )}
                        {getEditMode() && (
                            <div>
                                <TextareaAutosize
                                    className='cloze-interactive-text-editor-text'
                                    defaultValue={getTextarea()}
                                    name='text'
                                    onChange={onChangeTextarea}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

InteractiveTextEditor.propTypes = { controls: PropTypes.object.isRequired };

export default InteractiveTextEditor;
