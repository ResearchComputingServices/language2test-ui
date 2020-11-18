import React from 'react';
import PropTypes from 'prop-types';
import { FormPaper, CloneButton, InUse } from '../common';
import Form from '../form';

function VocabularyForm({
    title,
    data,
    layout,
    buttons,
    onClone,
    controls,
    readonly,
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
    onClone: PropTypes.func,
    readonly: PropTypes.bool,
};

VocabularyForm.defaultProps = {
    title: 'Vocabulary Question',
    data: {},
    buttons: [],
    onClone: undefined,
    readonly: false,
};

export default VocabularyForm;
