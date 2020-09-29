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
}) {
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                color='primary'
                open={open}
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
        </div>
    );
}

ActionToast.propTypes = {
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onUndo: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ActionToast;
