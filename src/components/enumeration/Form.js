import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import Add from '@material-ui/icons/Add';
import { FormPaper } from '../common';
import Form from '../form';

const enumerationValuesTableStyle = {
    width: '60vw',
    minWidth: 450,
    padding: 20,
};

function EnumerationForm({
    title,
    data,
    layout,
    values,
    onValueAdd,
    onValueUpdate,
    onValueDelete,
    buttons,
    controls,
}) {
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
                    sections={[{
                        layout: [{
                            type: 'raw',
                            content: (
                                <div className='d-flex flex-column justify-content-center align-items-center my-5'>
                                    <MaterialTable
                                        columns={[{ field: 'text' }]}
                                        data={values}
                                        editable={{
                                            onRowAdd: onValueAdd,
                                            onRowUpdate: onValueUpdate,
                                            onRowDelete: onValueDelete,
                                        }}
                                        icons={{
                                            Add: props => (
                                                <Add
                                                    {...props}
                                                    color='primary'
                                                />
                                            ),
                                        }}
                                        localization={{
                                            body: {
                                                addTooltip: 'Add Enumeration Value',
                                                editRow: { deleteText: 'Are you sure?' },
                                            },
                                        }}
                                        style={enumerationValuesTableStyle}
                                        title='Enumeration Values'
                                    />
                                </div>
                            ),
                        }],
                    }]}
                />
            </div>
        </FormPaper>
    );
}

EnumerationForm.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    values: PropTypes.array,
    layout: PropTypes.array.isRequired,
    controls: PropTypes.object.isRequired,
    buttons: PropTypes.array,
    onValueAdd: PropTypes.func,
    onValueUpdate: PropTypes.func,
    onValueDelete: PropTypes.func,
};

EnumerationForm.defaultProps = {
    title: 'Enumeration Question',
    data: {},
    values: [],
    buttons: [],
    onValueAdd: undefined,
    onValueUpdate: undefined,
    onValueDelete: undefined,
};

export default EnumerationForm;
