import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MuiButton from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import { useMountedState } from '../../hooks';

function Button(props) {
    const [loading, setLoading] = useState(false);
    const { className, children, onClick, disabled } = props;
    const isMounted = useMountedState();
    return (
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
            variant='contained'
            {..._.omit(props, ['className', 'disabled', 'onClick'])}
        >
            {!loading && children}
            {loading && (
                <CircularProgress className='button-spinner' />
            )}
        </MuiButton>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    onClick: undefined,
    disabled: undefined,
    className: '',
};

export default Button;
