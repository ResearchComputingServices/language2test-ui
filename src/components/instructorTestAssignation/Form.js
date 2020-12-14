import React from 'react';
import PropTypes from 'prop-types';
import { FormPaper } from '../common';
import Form from '../form';

function InstructorTestAssignationForm({
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

InstructorTestAssignationForm.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    layout: PropTypes.array.isRequired,
    controls: PropTypes.object.isRequired,
    buttons: PropTypes.array,
};

InstructorTestAssignationForm.defaultProps = {
    title: 'Test Schedules',
    data: {},
    buttons: [],
};

export default InstructorTestAssignationForm;
