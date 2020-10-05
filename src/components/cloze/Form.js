import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { FormPaper, CloneButton, InUse } from '../common';
import Form from '../form';

function ClozeForm({
    title,
    data,
    layout,
    buttons,
    controls,
    children,
    onClone,
}) {
    const ref = createRef();
    const getUsedIn = data => {
        if (data.immutable && data.unremovable) {
            return 'Test and Test Session(s)';
        }
        if (data.immutable) {
            return 'Test(s)';
        }
        if (data.unremovable) {
            return 'Test Session(s)';
        }
    };
    return (
        <FormPaper ref={ref}>
            <div className='form-body'>
                <div className='d-flex flex-direction-column justify-content-between'>
                    <h6 className='form-title'>{title}</h6>
                    <CloneButton onClick={onClone} />
                </div>
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
    onClone: PropTypes.func,
};

ClozeForm.defaultProps = {
    title: 'Cloze Question',
    data: {},
    buttons: [],
    onClone: undefined,
};

export default ClozeForm;
