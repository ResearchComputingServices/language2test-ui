import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Form from '../form';

const QuestionnaireForm = ({
    data,
    layout,
    dynamicData,
    dynamicLayout,
    onSubmit,
    controls,
}) => (
    <div className='demographic-questionnaire-container'>
        <div className='text-center'>
            <h1 className='mb-3'>Please fill in the necessary Demographic Information below.</h1>
        </div>
        <Paper className='demographic-questionnaire-form-container'>
            <div className='demographic-questionnaire-form'>
                <Form
                    buttons={[{
                        title: 'Save',
                        handler: onSubmit,
                    }]}
                    controls={controls}
                    data={data}
                    layout={layout}
                    sections={[{
                        layout: dynamicLayout,
                        data: dynamicData,
                    }]}
                />
            </div>
        </Paper>
    </div>
);

QuestionnaireForm.propTypes = {
    data: PropTypes.object.isRequired,
    layout: PropTypes.array.isRequired,
    dynamicData: PropTypes.object.isRequired,
    dynamicLayout: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    controls: PropTypes.object.isRequired,
};

export default QuestionnaireForm;
