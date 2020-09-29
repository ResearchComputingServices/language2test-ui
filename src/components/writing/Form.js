import React from 'react';
import PropTypes from 'prop-types';
import { FormPaper } from '../common';
import Form from '../form';

function WritingForm({
    title,
    data,
    layout,
    dynamicLayout,
    buttons,
    controls,
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
