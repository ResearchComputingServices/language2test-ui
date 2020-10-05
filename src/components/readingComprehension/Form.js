import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { FormPaper, InUse } from '../common';
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
    const getUsedIn = data => {
        if (data.immutable && data.unremovable) {
            return 'Test(s) and Test Session(s)';
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
                <h6 className='form-title'>{title}</h6>
                <InUse
                    msg={`Currently being used in one or more ${getUsedIn(data)}`}
                    show={data.immutable || data.unremovable}
                />
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
