import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { DropzoneArea } from 'material-ui-dropzone';
import LinearProgress from '@material-ui/core/LinearProgress';
import _ from 'lodash';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import { ModalInfo } from '.';
import { useForm, useService, useMount } from '../../hooks';

function ImageUploader({ imageName, onUpload, className }) {
    const fileService = useService('file');
    const { handleSubmit, register, unregister, errors, control, setValue, clearError, getValues } = useForm();
    const [loading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [filename, setFilename] = useState(imageName);
    const [image, setImage] = useState(null);

    useMount(async () => {
        if (!_.isEmpty(imageName) && !_.isNil(imageName)) {
            setLoading(true);
            try {
                const downloadedImage = await fileService.download(imageName);
                setImage(URL.createObjectURL(downloadedImage.data));
            } catch {} finally {
                setLoading(false);
            }
        }
    });

    const handleClose = () => {
        setShow(false);
        unregister('file');
    };

    const handleShow = () => {
        setShow(true);
        register({ name: 'file' }, { required: true });
    };

    const handleImageChange = files => {
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
        await fileService.upload(data.file, data.name);
        setImage(URL.createObjectURL(data.file[0]));
        setFilename(data.name);
        if (_.isFunction(onUpload)) {
            await onUpload(data);
        }
        setModalLoading(false);
    };

    return (
        <>
            {loading && <LinearProgress />}
            {!loading && (
                <div>
                    <div className='column'>
                        {filename && <p className='image-uploader-filename'>{`Generated Filename: ${filename}`}</p>}
                        {filename && (
                            <img
                                alt='uploaded'
                                className={`image-uploader-image scale-down ${className}`}
                                src={image}
                            />
                        )}
                    </div>
                    <Button
                        className={className}
                        color='primary'
                        onClick={handleShow}
                        variant='contained'
                    >
                        {filename ? 'Change Attached Image' : 'Attach Image'}
                    </Button>
                    <ModalInfo
                        buttons={[
                            {
                                props: {
                                    className: 'mr-3',
                                    color: 'primary',
                                    disabled: _.isEmpty(getValues('name')) || !_.isEmpty(errors) || modalLoading,
                                    variant: 'contained',
                                },
                                title: 'Upload Image',
                                onClick: handleSubmit(uploadFile),
                                hideModal: true,
                            },
                            {
                                props: {
                                    color: 'primary',
                                    variant: 'contained',
                                },
                                title: 'Cancel',
                                hideModal: true,
                            },
                        ]}
                        onHide={handleClose}
                        show={show}
                        title='Upload Image'
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
                                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                name='file'
                                onChange={handleImageChange}
                                showAlerts={false}
                            />
                            {'file' in errors && <div className='field-error'>A file is Mandatory for save</div>}
                        </div>
                    </ModalInfo>
                </div>
            )}
        </>
    );
}

ImageUploader.propTypes = {
    imageName: PropTypes.string,
    onUpload: PropTypes.func,
    className: PropTypes.string,
};

ImageUploader.defaultProps = {
    imageName: '',
    onUpload: null,
    className: '',
};

export default ImageUploader;
