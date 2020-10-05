import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { FormPaper, InUse } from '../common';
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
    const getUsedIn = data => {
        if (data.immutable && data.unremovable) {
            return 'Test(s) and Test Session(s)';
        }
        if (data.immutable) {
            return 'Test Session(s)';
        }
        if (data.unremovable) {
            return 'Test(s)';
        }
    };
    return (
        <FormPaper ref={ref}>
            <div className='form-body'>
                <h6 className='cloze-form-title'>{title}</h6>
                <InUse
                    msg={`Currently being used in one or more ${getUsedIn(data)}`}
                    show={data.immutable || data.unremovable}
                />
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
