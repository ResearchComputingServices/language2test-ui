import React, { forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const FormPaper = forwardRef((props, ref) => (
    <div
        ref={ref}
        className='my-5'
    >
        <Paper
            className='form-paper'
            elevation={3}
        >
            {props.children}
        </Paper>
    </div>
));

FormPaper.propTypes = { children: PropTypes.node.isRequired };

export default FormPaper;
