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
    const getUsedIn = data => {
        if (data.immutable && data.unremovable) {
            return 'Test and Test Session';
        }
        if (data.immutable) {
            return 'Test';
        }
        if (data.unremovable) {
            return 'Test Session';
        }
    };
    return (
        <FormPaper>
            <div className='form-body'>
                <h6 className='form-title'>{title}</h6>
                <div className='pb-2'>
                    <h6 className='field error-text'>
                        <b>
                            <i>
                                {`Currently used in one or more ${getUsedIn(data)}`}
                            </i>
                        </b>
                    </h6>
                </div>
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
