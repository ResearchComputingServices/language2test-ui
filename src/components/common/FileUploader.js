import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { DropzoneArea } from 'material-ui-dropzone';
import LinearProgress from '@material-ui/core/LinearProgress';
import UploadIcon from '@material-ui/icons/Publish';
import _ from 'lodash';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import { ModalInfo } from '.';
import { useForm } from '../../hooks';

function FileUploader({ onUpload, acceptedFiles, as: Component }) {
    const { handleSubmit, register, unregister, errors, control, setValue, clearError, getValues } = useForm();
    const [modalLoading, setModalLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        unregister('file');
    };

    const handleOpen = () => {
        register({ name: 'file' }, { required: true });
        setShow(true);
    };

    const handleFileChange = files => {
        clearError(['file', 'name']);
        if (!_.isEmpty(files)) {
            setValue('file', files);
            if (_.isEmpty(getValues('name'))) {
                setValue('name', v4());
            }
        } else {
            setValue('file', undefined);
            setValue('name', '');
        }
    };

    const uploadFile = async data => {
        setModalLoading(true);
        if (_.isFunction(onUpload)) {
            if (_.isFunction(onUpload)) {
                await onUpload(data);
            }
        }
        setModalLoading(false);
    };

    return (
        <div>
            {!_.isNil(Component) && (
                <Component
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                />
            )}
            {_.isNil(Component) && (
                <Button
                    color='primary'
                    onClick={handleOpen}
                    startIcon={<UploadIcon />}
                    variant='contained'
                >
                    Upload
                </Button>
            )}
            <ModalInfo
                buttons={[
                    {
                        props: {
                            className: 'mr-3',
                            color: 'primary',
                            disabled: _.isEmpty(getValues('name')) || !_.isEmpty(errors) || modalLoading,
                            variant: 'contained',
                        },
                        name: 'uploadFile',
                        onClick: handleSubmit(uploadFile),
                        hideModal: true,
                        title: 'Upload File',
                    },
                    {
                        props: {
                            color: 'primary',
                            variant: 'contained',
                        },
                        name: 'cancel',
                        hideModal: true,
                        title: 'Cancel',
                    },
                ]}
                onHide={handleClose}
                show={show}
                tile='Upload File'
            >
                <LinearProgress className={`${modalLoading ? 'show' : 'hide'} my-3`} />
                <div className='field'>
                    <Controller
                        as={TextField}
                        control={control}
                        defaultValue=''
                        disabled
                        fullWidth
                        label='Generated Filename'
                        name='name'
                        required
                        rules={{ required: true }}
                        variant='outlined'
                    />
                    {'name' in errors && <div className='field-error'>A filename is Mandatory for save</div>}
                </div>
                <div className='field'>
                    <DropzoneArea
                        acceptedFiles={acceptedFiles}
                        name='file'
                        onChange={handleFileChange}
                        showAlerts={false}
                    />
                    {'file' in errors && <div className='field-error'>A file is Mandatory for save</div>}
                </div>
            </ModalInfo>
        </div>
    );
}

FileUploader.propTypes = {
    onUpload: PropTypes.func.isRequired,
    acceptedFiles: PropTypes.array,
    as: PropTypes.func,
};

FileUploader.defaultProps = {
    acceptedFiles: undefined,
    as: undefined,
};

export default FileUploader;
