import React from 'react';
import PropTypes from 'prop-types';
import { FormPaper, Button } from '../common';
import Form from '../form';
import { ApiPicklistField } from '../form/fields';

function StudentForm({
    title,
    data,
    layout,
    dynamicLayout,
    dynamicData,
    onAddDemographicField,
    disableAddDemographicField,
    selectedDemographicFieldsFilter,
    buttons,
    controls,
}) {
    const configureSections = () => {
        const sections = [
            {
                layout: dynamicLayout,
                data: dynamicData,
                append: (
                    <div className='d-flex justify-content-end align-items-center'>
                        <div>
                            <ApiPicklistField
                                controls={controls}
                                field={{
                                    name: 'selectedDemographicField',
                                    label: 'Demographic Fields',
                                    type: 'api-picklist-multiple',
                                    entity: 'demographicQuestionnaireField',
                                    filter: selectedDemographicFieldsFilter,
                                }}
                            />
                            <Button
                                className='mt-1 mr-2'
                                color='primary'
                                disabled={disableAddDemographicField}
                                onClick={onAddDemographicField}
                                size='small'
                                variant='contained'
                            >
                                Add Demographic Field
                            </Button>
                        </div>
                    </div>
                ),
            },
        ];
        return sections;
    };
    return (
        <FormPaper >
            <div className='form-body'>
                <h6 className='form-title'>
                    {title}
                </h6>
                <Form
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    layout={layout}
                    sections={configureSections()}
                />
            </div>
        </FormPaper>
    );
}

StudentForm.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    layout: PropTypes.array.isRequired,
    dynamicData: PropTypes.object.isRequired,
    dynamicLayout: PropTypes.array.isRequired,
    onAddDemographicField: PropTypes.func.isRequired,
    selectedDemographicFieldsFilter: PropTypes.func.isRequired,
    disableAddDemographicField: PropTypes.bool.isRequired,
    buttons: PropTypes.array,
    controls: PropTypes.object.isRequired,
};

StudentForm.defaultProps = {
    title: 'Student',
    buttons: [],
};

export default StudentForm;
