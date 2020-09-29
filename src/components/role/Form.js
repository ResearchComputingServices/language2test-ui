import React from 'react';
import PropTypes from 'prop-types';
import { FormPaper } from '../common';
import Form from '../form';

function RoleForm({
    title,
    data,
    layout,
    buttons,
    controls,
    children,
}) {
    return (
        <FormPaper >
            <div className='form-body-wide'>
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
                            content: children,
                        }],
                    }]}
                />
            </div>
        </FormPaper>
    );
}

RoleForm.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    layout: PropTypes.array.isRequired,
    controls: PropTypes.object.isRequired,
    buttons: PropTypes.array,
    children: PropTypes.node,
};

RoleForm.defaultProps = {
    title: 'Role',
    data: {},
    buttons: [],
    children: null,
};

export default RoleForm;
