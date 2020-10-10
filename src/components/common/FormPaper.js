import React, { forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const FormPaper = forwardRef((props, ref) => (
    <Paper
        ref={ref}
        className='form-paper my-5'
        elevation={2}
    >
        {props.children}
    </Paper>
));

FormPaper.propTypes = { children: PropTypes.node.isRequired };

export default FormPaper;
