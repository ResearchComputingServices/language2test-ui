import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import { useEventListener } from '../../hooks';
import useBlank from './useBlank';

function Blank({
    hint,
    defaultValue,
    onChange,
    typed,
    options,
}) {
    const ref = useRef();
    const {
        getWidth,
        getToggle,
        getValue,
        setWidth,
        setToggle,
        setValue,
        getJustSelected,
        setJustSelected,
    } = useBlank(hint + defaultValue);

    const onPicklistClick = value => {
        setToggle(false);
        onChange(value);
        setValue(value);
    };

    const onInputChange = event => {
        if (!typed) return;
        const { value } = event.target;
        setValue(value);
        onChange(value);
    };

    useEventListener('click', () => getToggle() && !getJustSelected() && setToggle(false));

    useEffect(() => {
        if (getValue().length > 10) {
            setWidth(100 + getValue().length * 5);
        } else {
            setWidth(100);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValue()]);

    return (
        <span
            ref={ref}
            className='cloze-blank-root'
        >
            <input
                className='no-outline cloze-blank'
                onChange={onInputChange}
                onClick={() => {
                    setToggle(!getToggle());
                    setJustSelected(true);
                    setImmediate(() => setJustSelected(false));
                }}
                style={{ width: getWidth() }}
                type='text'
                value={getValue()}
            />
            {getToggle() && (
                <Paper style={{
                    zIndex: 1000,
                    position: 'absolute',
                    top: ref.current.offsetTop + 35,
                    left: ref.current.offsetLeft,
                    minWidth: getWidth(),
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    maxHeight: 400,
                }}
                >
                    {!typed
                        ? _.map(options, (option, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => onPicklistClick(option.text)}
                                style={{ maxHeight: 20, padding: 20, minWidth: '100%' }}
                            >
                                <div style={{ minWidth: '100%' }}>
                                    {option.text}
                                </div>
                            </MenuItem>
                        ))
                        : []}
                </Paper>
            )}
        </span>
    );
}

Blank.propTypes = {
    options: PropTypes.array,
    hint: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    typed: PropTypes.bool,
};
Blank.defaultProps = {
    options: [],
    hint: '',
    onChange: undefined,
    defaultValue: '',
    typed: false,
};

export default Blank;
