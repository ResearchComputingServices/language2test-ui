import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Ripple } from '.';
import { useStore, useActions } from '../../hooks';

function Confirmation() {
    const {
        loading,
        open,
        title,
        text,
    } = useStore('dialog');
    const { hideDialog, confirm, cancel } = useActions('dialog');
    return (
        <Dialog
            onClose={() => hideDialog()}
            open={open}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {loading && (
                    <Ripple
                        className='confirmation-ripple'
                        size={50}
                    />
                )}
                <Button
                    color='primary'
                    disabled={loading}
                    onClick={() => confirm()}
                >
                    Ok
                </Button>
                <Button
                    color='primary'
                    disabled={loading}
                    onClick={() => cancel()}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Confirmation;
