import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';

function PreviewButton(props) {
    return (
        <Tooltip title='Preview'>
            <IconButton
                className='form-action-button'
                {...props}
            >
                <VisibilityIcon />
            </IconButton>
        </Tooltip>
    );
}

export default PreviewButton;
