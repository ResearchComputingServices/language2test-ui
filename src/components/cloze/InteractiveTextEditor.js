import _ from 'lodash';
import React, { useRef, useEffect } from 'react';
import { ToastsStore } from 'react-toasts';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import { ContextMenu, ContextMenuTrigger, MenuItem as ContextMenuItem } from 'react-contextmenu';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useEventListener } from '../../hooks';
import useInteractiveTextEditor from './useInteractiveTextEditor';

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
    const {
        getSelected,
        getData,
        getUnMarkAsBlank,
        getValue,
        getEditMode,
        getTextarea,
        setTextarea,
        setData,
        setValue,
        setSelected,
        setEditMode,
        setUnMarkAsBlank,
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

    const onSelectText = () => {
        if (getValue() !== 'text' && !getEditMode()) return;
        const selection = window.getSelection();
        const startIndex = window.getSelection().anchorOffset;
        const endIndex = window.getSelection().focusOffset;
        const newStartIndex = startIndex > endIndex ? endIndex : startIndex;
        const newEndIndex = endIndex < startIndex ? startIndex : endIndex;
        if (getData().present[startIndex - 1] === '*' && getData().present[endIndex] === '*') {
            !getUnMarkAsBlank() && setUnMarkAsBlank(true);
        } else {
            getUnMarkAsBlank() && setUnMarkAsBlank(false);
        }
        const text = selection.toString();
        if (!_.isEmpty(text) && _.eq(selection.type, 'Range') && !selection.isCollapsed && selection.anchorNode) {
            setSelected({
                selected: text,
                startIndex: newStartIndex,
                endIndex: newEndIndex,
            });
        } else if (!_.isEmpty(getSelected())) {
            setSelected({
                selected: '',
                startIndex: 0,
                endIndex: 0,
            });
        }
    };

    useEventListener('click', onSelectText);

    useEventListener('keydown', e => {
        if (getValue() === 'text' && getEditMode()) return;
        // Redo
        if ((window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.shiftKey && e.keyCode === 90) {
            e.preventDefault();
            if (!_.isEmpty(getData().redo)) {
                // When we redo, we pop the redo stack which will become our present.
                // The current present item which will get replaced will become the next thing we can undo into.
                setData(data => {
                    const redoItem = data.redo.pop();
                    data.undo.push(getData().present);
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
            if (!_.isEmpty(getData().undo)) {
                // Redo stack will only get populated when we perform the undo action.
                // When we undo we remove the last element from the undo stack which becomes our current present.
                // The current present item which will get replaced will become the next thing we can redo into.
                setData(data => {
                    const undoItem = data.undo.pop();
                    data.redo.push(getData().present);
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
        const selected = getSelected();
        const lengthOfData = getData().present.length;
        const firstSegment = getData().present.substring(0, selected.startIndex);
        const lastSegment = getData().present.substring(selected.endIndex, lengthOfData);
        let selectedText = getData().present.substring(selected.startIndex, selected.endIndex);
        selectedText = _.trim(selectedText);
        if (!isBlankValid(getData().present)) return ToastsStore.error('Please double check the text, it has invalid format');
        const newData = `${firstSegment}*${selectedText}*${lastSegment}`;
        if (_.isEmpty(selectedText)) {
            return;
        }
        // Undo stack will only get populated when perform an add or remove action.
        setData(data => {
            data.undo.push(getData().present);
            return ({
                ...data,
                present: newData,
            });
        });
    };

    const onUnmarkAsBlank = () => {
        const selected = getSelected();
        const startBracketIndex = selected.startIndex - 1;
        const endBracketIndex = selected.endIndex - 1;
        let newText = text.substring(0, startBracketIndex) + text.substring(startBracketIndex + 1, text.length);
        newText = newText.substring(0, endBracketIndex) + newText.substring(endBracketIndex + 1, newText.length);
        // Undo stack will only get populated when perform an add or remove action.
        setData(data => {
            data.undo.push(getData().present);
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
                            <ContextMenuTrigger id='cloze-interactive-text'>
                                <div
                                    className='cloze-interactive-text-editor-text'
                                    onClick={onSelectText}
                                    onKeyDown={_.noop}
                                    role='textbox'
                                    tabIndex={0}
                                >
                                    {getData().present}
                                </div>
                            </ContextMenuTrigger>

                        )}
                        {getEditMode() && (
                            <div>
                                <TextareaAutosize
                                    className='cloze-interactive-text-editor-edit'
                                    defaultValue={getTextarea()}
                                    name='text'
                                    onChange={onChangeTextarea}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <ContextMenu id='cloze-interactive-text'>
                    <Paper>
                        {!getUnMarkAsBlank() && (
                            <ContextMenuItem onClick={onMarkAsBlank}>
                                <MenuItem>Mark as blank</MenuItem>
                            </ContextMenuItem>
                        )}
                        {getUnMarkAsBlank() && (
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
