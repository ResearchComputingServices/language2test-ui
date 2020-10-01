import _ from 'lodash';
import React, { useState, useRef, useEffect } from 'react';
import { ToastsStore } from 'react-toasts';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import { ContextMenu, ContextMenuTrigger, MenuItem as ContextMenuItem } from 'react-contextmenu';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useEventListener } from '../../hooks';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            hidden={value !== index}
            role='tabpanel'
            {...other}
        >
            {value === index && (
                <Box
                    lineHeight={100}
                    p={2}
                >
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

TabPanel.defaultProps = { children: undefined };

function InteractiveTextEditor({ controls }) {
    const text = controls.getValues('text');
    const ref = useRef(null);
    const [textarea, setTextarea] = useState(text);
    const [data, setData] = useState({
        present: text || '',
        undo: [],
        redo: [],
    });
    const [value, setValue] = useState('text');
    const [selected, setSelected] = useState({
        selected: '',
        startIndex: 0,
        endIndex: 0,
    });
    const [editMode, setEditMode] = useState(!data.present);
    const [unMarkAsBlank, setUnMarkAsBlank] = useState(false);
    const selectedRef = useRef(null);
    const dataRef = useRef(null);
    const unMarkAsBlankRef = useRef(null);
    selectedRef.current = selected;
    dataRef.current = data;
    unMarkAsBlankRef.current = unMarkAsBlank;

    useEffect(() => {
        if (!_.isNil(data.present) && !_.isEmpty(data.present)) {
            controls.setValue('text', data.present);
            setTextarea(data.present);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.present]);

    useEffect(() => {
        if (!_.isNil(textarea) && !_.isEmpty(textarea)) {
            controls.setValue('text', textarea);
            setData(d => ({
                ...d,
                present: textarea,
            }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textarea]);

    useEffect(() => {
        setData(data => ({
            ...data,
            present: text,
        }));
    }, [text]);

    const onSelectText = () => {
        if (value !== 'text' && !editMode) return;
        const selection = window.getSelection();
        const startIndex = window.getSelection().anchorOffset;
        const endIndex = window.getSelection().focusOffset;
        const newStartIndex = startIndex > endIndex ? endIndex : startIndex;
        const newEndIndex = endIndex < startIndex ? startIndex : endIndex;
        if (dataRef.current.present[startIndex - 1] === '*' && dataRef.current.present[endIndex] === '*') {
            !unMarkAsBlankRef.current && setUnMarkAsBlank(true);
        } else {
            unMarkAsBlankRef.current && setUnMarkAsBlank(false);
        }
        const text = selection.toString();
        if (!_.isEmpty(text) && _.eq(selection.type, 'Range') && !selection.isCollapsed && selection.anchorNode) {
            setSelected({
                selected: text,
                startIndex: newStartIndex,
                endIndex: newEndIndex,
            });
        } else if (!_.isEmpty(selected)) {
            setSelected({
                selected: '',
                startIndex: 0,
                endIndex: 0,
            });
        }
    };

    useEventListener('click', onSelectText);

    useEventListener('keydown', e => {
        if (value === 'text' && editMode) return;
        // Redo
        if ((window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.shiftKey && e.keyCode === 90) {
            e.preventDefault();
            if (!_.isEmpty(dataRef.current.redo)) {
                // When we redo, we pop the redo stack which will become our present.
                // The current present item which will get replaced will become the next thing we can undo into.
                setData(data => {
                    const redoItem = data.redo.pop();
                    data.undo.push(data.present);
                    return ({
                        ...data,
                        present: redoItem,
                    });
                });
            }
            return;
        }
        // Undo
        if ((window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.keyCode === 90) {
            e.preventDefault();
            if (!_.isEmpty(dataRef.current.undo)) {
                // Redo stack will only get populated when we perform the undo action.
                // When we undo we remove the last element from the undo stack which becomes our current present.
                // The current present item which will get replaced will become the next thing we can redo into.
                setData(data => {
                    const undoItem = data.undo.pop();
                    data.redo.push(data.present);
                    return ({
                        ...data,
                        present: undoItem,
                    });
                });
            }
        }
    });

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

    const isBlankValid = text => {
        let count = 0;
        _.each(text, word => {
            word === '*' && ++count;
        });
        return count % 2 === 0;
    };

    const onMarkAsBlank = () => {
        const selected = selectedRef.current;
        const data = dataRef.current;
        const lengthOfData = data.present.length;
        const firstSegment = data.present.substring(0, selected.startIndex);
        const lastSegment = data.present.substring(selected.endIndex, lengthOfData);
        const selectedText = data.present.substring(selected.startIndex, selected.endIndex);
        if (!isBlankValid(data.present)) return ToastsStore.error('Please double check the text, it has invalid format');
        const newData = `${firstSegment}*${selectedText}*${lastSegment}`;
        if (_.isEmpty(selectedText)) {
            return;
        }
        // Undo stack will only get populated when perform an add or remove action.
        setData(data => {
            data.undo.push(data.present);
            return ({
                ...data,
                present: newData,
            });
        });
    };

    const onUnmarkAsBlank = () => {
        const selected = selectedRef.current;
        const text = dataRef.current.present;
        const startBracketIndex = selected.startIndex - 1;
        const endBracketIndex = selected.endIndex - 1;
        let newText = text.substring(0, startBracketIndex) + text.substring(startBracketIndex + 1, text.length);
        newText = newText.substring(0, endBracketIndex) + newText.substring(endBracketIndex + 1, newText.length);
        // Undo stack will only get populated when perform an add or remove action.
        setData(data => {
            data.undo.push(data.present);
            return ({
                ...data,
                present: newText,
            });
        });
    };

    return (
        <>
            <div
                ref={ref}
                className='my-2'
            >
                <Paper>
                    <Tabs
                        onChange={handleChange}
                        value={value}
                    >
                        <Tab
                            label='Cloze Text'
                            value='text'
                        />
                    </Tabs>
                </Paper>
                <TabPanel
                    index='text'
                    value={value}
                >
                    <div className='row mb-3'>
                        {editMode && (
                            <Tooltip title='Stop Editing'>
                                <IconButton
                                    color='secondary'
                                    onClick={onEditRemove}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        {!editMode && (
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
                        {!editMode && (
                            <ContextMenuTrigger id='cloze-interactive-text'>
                                <Typography
                                    className='cloze-interactive-text-editor-text'
                                    onClick={onSelectText}
                                >
                                    {data.present}
                                </Typography>
                            </ContextMenuTrigger>

                        )}
                        {editMode && (
                            <Typography>
                                <TextareaAutosize
                                    className='cloze-interactive-text-editor-edit'
                                    defaultValue={textarea}
                                    name='text'
                                    onChange={onChangeTextarea}
                                />
                            </Typography>
                        )}
                    </div>
                </TabPanel>
                <ContextMenu id='cloze-interactive-text'>
                    <Paper>
                        {!unMarkAsBlank && (
                            <ContextMenuItem onClick={onMarkAsBlank}>
                                <MenuItem>Mark as blank</MenuItem>
                            </ContextMenuItem>
                        )}
                        {unMarkAsBlank && (
                            <ContextMenuItem onClick={onUnmarkAsBlank}>
                                <MenuItem>Unmark as blank</MenuItem>
                            </ContextMenuItem>
                        )}
                    </Paper>
                </ContextMenu>
            </div>
        </>
    );
}

InteractiveTextEditor.propTypes = { controls: PropTypes.object.isRequired };

export default InteractiveTextEditor;
