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
    readonly,
}) {
    const ref = createRef();
    const getUsedIn = data => {
        if (data.immutable && data.unremovable) {
            return 'Test(s) and Past Result(s)';
        }
        if (data.immutable) {
            return 'Past Result(s)';
        }
        if (data.unremovable) {
            return 'Test(s)';
        }
    };
    return (
        <FormPaper ref={ref}>
            <div className='form-body'>
                <div className='d-flex flex-direction-column justify-content-between'>
                    <h6 className='form-title'>{title}</h6>
                    {onClone && <CloneButton onClick={onClone} />}
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
                    readonly={readonly}
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
    readonly: PropTypes.bool,
};

ClozeForm.defaultProps = {
    title: 'Cloze Question',
    data: {},
    buttons: [],
    onClone: undefined,
    readonly: false,
};

export default ClozeForm;
