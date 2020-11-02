import React from 'react';
import PropTypes from 'prop-types';
import { FormPaper, InUse } from '../common';
import Form from '../form';

function InstructorStudentClassForm({
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
                <InUse
                    msg='Currently being used in one or more Test Assignation(s)'
                    show={data.immutable || data.unremovable}
                />
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

InstructorStudentClassForm.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    layout: PropTypes.array.isRequired,
    controls: PropTypes.object.isRequired,
    buttons: PropTypes.array,
};

InstructorStudentClassForm.defaultProps = {
    title: 'Student Class',
    data: {},
    buttons: [],
};

export default InstructorStudentClassForm;
