import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { FormPaper } from '../common';
import Form from '../form';

function ClozeForm({
    title,
    data,
    layout,
    buttons,
    controls,
    children,
}) {
    const ref = createRef();
    return (
        <FormPaper ref={ref}>
            <div className='form-body'>
                <h6 className='cloze-form-title'>
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
                            content: <div className='field'>{children}</div>,
                        }],
                    }]}
                />
            </div>
        </FormPaper>
    );
}

ClozeForm.propTypes = {
    title: PropTypes.string,
    layout: PropTypes.array.isRequired,
    data: PropTypes.object,
    buttons: PropTypes.array,
    controls: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
};

ClozeForm.defaultProps = {
    title: 'Cloze Question',
    data: {},
    buttons: [],
};

export default ClozeForm;
