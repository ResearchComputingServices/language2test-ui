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

function InteractiveTextEditor({ controls, questions }) {
    const text = controls.getValues('text');
    const {
        getData,
        getValue,
        getEditMode,
        getTextarea,
        setTextarea,
        setData,
        setValue,
        setEditMode,
    } = useInteractiveTextEditor(text);

    useEffect(() => {
        if (!_.isNil(getData().present) && !_.isEmpty(getData().present)) {
            controls.setValue('text', getData().present);
            setTextarea(getData().present);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getData().present]);

    useEffect(() => {
        if (!_.isNil(getTextarea()) && !_.isEmpty(getTextarea())) {
            controls.setValue('text', getTextarea());
            setData(d => ({
                ...d,
                present: getTextarea(),
            }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTextarea()]);

    useEffect(() => {
        setData(data => ({
            ...data,
            present: text,
        }));
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
        for (let i = 0; i < text.length; ++i) {
            const word = text[i];
            if (word === '*' && !bracketOpen) {
                newText += segment;
                segment = '';
                bracketOpen = true;
            } else if (word === '*' && bracketOpen) {
                newText += blankDashes;
                segment = '';
                bracketOpen = false;
            } else {
                segment += word;
            }
        }
        text = newText + segment;
        text = text.split(blankDashes);
        const formattedText = [];
        _.each(text, (word, index) => {
            let firstLetterHint = '';
            if (word[word.length - 1] !== '' && word[word.length - 2] === ' ') {
                firstLetterHint = word[word.length - 1];
                word = word.substring(0, word.length - 1);
            }
            formattedText.push(word);
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

InteractiveTextEditor.propTypes = {
    controls: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
};

export default InteractiveTextEditor;
