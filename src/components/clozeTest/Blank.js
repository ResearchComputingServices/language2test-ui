import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import { useEventListener } from '../../hooks';

function Blank({ hint, defaultValue, onChange, typed, options }) {
    const [width, setWidth] = useState(100);
    const [toggle, setToggle] = useState(false);
    const [value, setValue] = useState(hint + defaultValue);
    const ref = useRef();

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

    useEventListener('click', () => toggle && setToggle(false));

    useEffect(() => {
        if (value.length > 10) {
            setWidth(100 + value.length * 5);
        } else {
            setWidth(100);
        }
    }, [value]);

    return (
        <span
            ref={ref}
            className='cloze-blank-root'
        >
            <input
                className='no-outline cloze-blank'
                onChange={onInputChange}
                onClick={() => {
                    setToggle(!toggle);
                }}
                style={{ width }}
                type='text'
                value={value}
            />
            {toggle && (
                <Paper style={{
                    zIndex: 1000,
                    position: 'absolute',
                    top: ref.current.offsetTop + 35,
                    left: ref.current.offsetLeft,
                    width,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
                >
                    {!typed
                        ? _.map(options, (option, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => onPicklistClick(option.text)}
                                style={{ width: '100%' }}
                            >
                                <div style={{
                                    width: '100%',
                                    textAlign: 'center',
                                }}
                                >
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
