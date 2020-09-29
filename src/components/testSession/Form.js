import React from 'react';
import PropTypes from 'prop-types';
import { FormPaper } from '../common';
import Form from '../form';

function TestSessionForm({
    title,
    data,
    layout,
    buttons,
    controls,
    children,
}) {
    return (
        <FormPaper>
            <div className='form-body'>
                <h6 className='form-title'>
                    {title}
                </h6>
                <Form
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    layout={layout}
                    sections={[{
                        layout: [{
                            type: 'raw',
                            content: children,
                        }],
                    }]}
                />
            </div>
        </FormPaper>
    );
}

TestSessionForm.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    layout: PropTypes.array.isRequired,
    children: PropTypes.node,
    buttons: PropTypes.array,
    controls: PropTypes.object.isRequired,
};

TestSessionForm.defaultProps = {
    title: 'Test Session',
    data: {},
    children: null,
    buttons: [],
};

export default TestSessionForm;
