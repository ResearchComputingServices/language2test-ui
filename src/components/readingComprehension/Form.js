import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { FormPaper } from '../common';
import Form from '../form';

function ReadingComprehensionForm({
    title,
    data,
    layout,
    dynamicLayout,
    controls,
    buttons,
    children,
}) {
    const ref = createRef();
    return (
        <FormPaper ref={ref}>
            <div className='form-body'>
                <h6 className='form-title'>
                    {title}
                </h6>
                <Form
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    layout={layout.concat(dynamicLayout)}
                    sections={[{
                        layout: [{
                            type: 'raw',
                            content: <div className='field'>{children}</div>,
                        }],
                    }]}
                />
            </div>
        </FormPaper>
    );
}

ReadingComprehensionForm.propTypes = {
    title: PropTypes.string,
    dynamicLayout: PropTypes.array.isRequired,
    layout: PropTypes.array.isRequired,
    data: PropTypes.object,
    buttons: PropTypes.array,
    controls: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
};

ReadingComprehensionForm.defaultProps = {
    title: 'Reading Comprehension Question',
    data: {},
    buttons: [],
};

export default ReadingComprehensionForm;
