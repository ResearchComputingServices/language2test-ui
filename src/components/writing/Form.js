import React from 'react';
import PropTypes from 'prop-types';
import { FormPaper, InUse } from '../common';
import Form from '../form';

function WritingForm({
    title,
    data,
    layout,
    dynamicLayout,
    buttons,
    controls,
}) {
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
        <FormPaper>
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
                />
            </div>
        </FormPaper>
    );
}

WritingForm.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    layout: PropTypes.array.isRequired,
    dynamicLayout: PropTypes.array,
    controls: PropTypes.object.isRequired,
    buttons: PropTypes.array,
};

WritingForm.defaultProps = {
    title: 'Writing Question',
    data: {},
    dynamicLayout: [],
    buttons: [],
};

export default WritingForm;
