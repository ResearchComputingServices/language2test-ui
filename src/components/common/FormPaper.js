import React, { forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const FormPaper = forwardRef((props, ref) => (
    <Paper
        ref={ref}
        className={`form-paper my-3 ${props.className}`}
        elevation={2}
        style={props.style}
    >
        {props.children}
    </Paper>
));

FormPaper.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
};

FormPaper.defaultProps = {
    style: undefined,
    className: '',
    children: null,
};

export default FormPaper;
