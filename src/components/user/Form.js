import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FormPaper, Button } from '../common';
import Form from '../form';
import SetTemporaryPasswordModal from './SetTemporaryPasswordModal';
import { ApiPicklistField } from '../form/fields';

function UserForm({
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
    onSetTemporaryPassword,
}) {
    const configureSections = () => {
        const sections = [
            {
                layout: dynamicLayout,
                data: dynamicData,
                append: (
                    <>
                        {!_.isNil(data.id) && (
                            <SetTemporaryPasswordModal
                                className='field'
                                onSetTemporaryPassword={onSetTemporaryPassword}
                            />
                        )}
                        <div className='d-flex justify-content-end align-items-center'>
                            <div style={{ width: 380 }}>
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
                    </>
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

UserForm.propTypes = {
    title: PropTypes.string,
    onSetTemporaryPassword: PropTypes.func,
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

UserForm.defaultProps = {
    title: 'User',
    buttons: [],
    onSetTemporaryPassword: undefined,
};

export default UserForm;
