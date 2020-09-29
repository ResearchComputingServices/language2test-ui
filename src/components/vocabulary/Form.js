import React from 'react';
import PropTypes from 'prop-types';
import { FormPaper } from '../common';
import Form from '../form';

function VocabularyForm({
    title,
    data,
    layout,
    buttons,
    controls,
}) {
    return (
        <FormPaper>
            <div className='form-body'>
                <h6 className='form-title'>{title}</h6>
                <Form
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    layout={layout}
                />
            </div>
        </FormPaper>
    );
}

VocabularyForm.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    layout: PropTypes.array.isRequired,
    controls: PropTypes.object.isRequired,
    buttons: PropTypes.array,
};

VocabularyForm.defaultProps = {
    title: 'Vocabulary Question',
    data: {},
    buttons: [],
};

export default VocabularyForm;
