import React from 'react';
import PropTypes from 'prop-types';
import { FormPaper } from '../common';
import Form from '../form';

function StudentClassForm({
    title,
    data,
    layout,
    buttons,
    controls,
}) {
    return (
        <FormPaper >
            <div className='form-body'>
                <h6 className='form-title'>
                    {title}
                </h6>
                <Form
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    layout={layout}
                />
            </div>
        </FormPaper>
    );
}

StudentClassForm.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    layout: PropTypes.array.isRequired,
    controls: PropTypes.object.isRequired,
    buttons: PropTypes.array,
};

StudentClassForm.defaultProps = {
    title: 'Student Class',
    data: {},
    buttons: [],
};

export default StudentClassForm;
