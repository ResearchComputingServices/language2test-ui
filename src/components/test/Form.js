import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import { FormPaper } from '../common';
import Form from '../form';

function TestForm({
    title,
    data,
    layout,
    dynamicLayout,
    dynamicData,
    onAddStep,
    onRemoveStep,
    controls,
    disableRemoveStep,
    buttons,
}) {
    const ref = createRef();
    return (
        <FormPaper ref={ref}>
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
                        append: (
                            <div className='d-flex justify-content-end align-items-center test-form-section'>
                                <div>
                                    <Button
                                        className='mr-3'
                                        color='primary'
                                        onClick={() => {
                                            window.scroll({
                                                top: ref.current.scrollHeight,
                                                behaviour: 'smooth',
                                            });
                                            _.isFunction(onAddStep) && onAddStep();
                                        }}
                                        size='small'
                                        variant='contained'
                                    >
                                        Add Step
                                    </Button>
                                    <Button
                                        color='primary'
                                        disabled={disableRemoveStep}
                                        onClick={() => {
                                            window.scroll({
                                                top: ref.current.scrollHeight,
                                                behaviour: 'smooth',
                                            });
                                            _.isFunction(onRemoveStep) && onRemoveStep();
                                        }}
                                        size='small'
                                        variant='contained'
                                    >
                                        Remove Step
                                    </Button>
                                </div>
                            </div>
                        ),
                        layout: dynamicLayout,
                        data: dynamicData,
                    }]}
                />
            </div>
        </FormPaper>
    );
}

TestForm.propTypes = {
    title: PropTypes.string,
    dynamicLayout: PropTypes.array.isRequired,
    dynamicData: PropTypes.object.isRequired,
    layout: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    buttons: PropTypes.array,
    onAddStep: PropTypes.func.isRequired,
    onRemoveStep: PropTypes.func.isRequired,
    controls: PropTypes.object.isRequired,
    disableRemoveStep: PropTypes.bool.isRequired,
};

TestForm.defaultProps = {
    title: 'Test',
    buttons: [],
};

export default TestForm;
