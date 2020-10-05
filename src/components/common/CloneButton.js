import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloneIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';

function CloneButton(props) {
    return (
        <Tooltip title='Clone Form'>
            <IconButton
                className='clone-button'
                {...props}
            >
                <CloneIcon />
            </IconButton>
        </Tooltip>
    );
}

export default CloneButton;
