import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function ActionToast({
    message,
    open,
    onUndo,
    onClose,
    className,
    style,
}) {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            className={className}
            color='primary'
            open={open}
            style={style}
        >
            <Alert
                action={(
                    <>
                        <Button
                            color='secondary'
                            onClick={onUndo}
                            size='small'
                        >
                            Undo
                        </Button>
                        <IconButton
                            aria-label='close'
                            color='inherit'
                            onClick={onClose}
                            size='small'
                        >
                            <CloseIcon fontSize='small' />
                        </IconButton>
                    </>
                )}
                onClose={onClose}
                severity='success'
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

ActionToast.propTypes = {
    message: PropTypes.string,
    open: PropTypes.bool,
    onUndo: PropTypes.func,
    onClose: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
};

ActionToast.defaultProps = {
    message: '',
    open: false,
    onUndo: undefined,
    onClose: undefined,
    className: undefined,
    style: undefined,
};

export default ActionToast;
