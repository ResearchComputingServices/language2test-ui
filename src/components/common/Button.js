import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MuiButton from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import clsx from 'clsx';
import { Ripple } from '.';
import { useMountedState } from '../../hooks';

function Button(props) {
    const [loading, setLoading] = useState(false);
    const { className, children, onClick, disabled, inline } = props;
    const isMounted = useMountedState();
    return (
        <span className={clsx({ 'd-flex align-items-center': inline })}>
            <MuiButton
                className={`${className} button`}
                disabled={loading || disabled}
                onClick={
                    _.isFunction(onClick)
                        ? async () => {
                            setLoading(true);
                            await onClick();
                            if (isMounted()) {
                                setLoading(false);
                            }
                        }
                        : undefined
                }
                variant={!inline ? 'contained' : undefined}
                {..._.omit(props, ['className', 'disabled', 'onClick', 'inline'])}
            >
                {!loading && !inline && children}
                {inline && children}
                {!inline && loading && (
                    <CircularProgress className='button-spinner' />
                )}
            </MuiButton>
            {loading && inline && (
                <Ripple
                    size={35}
                />
            )}
        </span>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    inline: PropTypes.bool,
};

Button.defaultProps = {
    onClick: undefined,
    disabled: undefined,
    className: '',
    inline: false,
};

export default Button;
