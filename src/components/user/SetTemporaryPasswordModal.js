import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Button, ModalInfo } from '../common';

function SetTemporaryPasswordModal({ className, onSetTemporaryPassword }) {
    const [show, setShow] = React.useState(false);
    const getInitialState = () => ({
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
    });
    const [values, setValues] = React.useState(getInitialState());

    React.useEffect(() => {
        if (show) {
            setValues(getInitialState());
        }
    }, [show, setValues]);

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    };

    const handleMouseDownConfirmPassword = event => {
        event.preventDefault();
    };

    const passwordMisMatch = () => !_.eq(values.confirmPassword, values.password);

    const onKeyDown = event => {
        if (_.eq(event.which, 13)) {
            onSetTemporaryPassword(values.password, () => setShow(false));
        }
    };

    return (
        <>
            <Button
                className={className}
                color='primary'
                onClick={() => setShow(true)}
                variant='contained'
            >
                Set Temporary Password
            </Button>
            <ModalInfo
                buttons={[
                    {
                        props: {
                            className: 'mr-3',
                            color: 'primary',
                            variant: 'contained',
                            disabled: _.isEmpty(values.password) || passwordMisMatch(),
                        },
                        name: 'change',
                        title: 'Set Password',
                        onClick: () => onSetTemporaryPassword(values.password, () => setShow(false)),
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
                onHide={() => setShow(false)}
                show={show}
                title='Set Temporary Password'
            >
                <div
                    className='col'
                    onKeyDown={_.isEmpty(values.password) || passwordMisMatch() ? undefined : onKeyDown}
                    role='presentation'
                >
                    <FormControl
                        className='field'
                        error={passwordMisMatch()}
                    >
                        <InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
                        <Input
                            endAdornment={(
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        tabIndex={-1}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )}
                            onChange={handleChange('password')}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                        />
                    </FormControl>
                    <FormControl
                        className='field'
                        error={passwordMisMatch()}
                    >
                        <InputLabel htmlFor='standard-adornment-password'>Confirm Password</InputLabel>
                        <Input
                            endAdornment={(
                                <InputAdornment position='end'>
                                    <IconButton
                                        disableRipple
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownConfirmPassword}
                                        tabIndex={-1}
                                    >
                                        {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )}
                            onChange={handleChange('confirmPassword')}
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                        />
                    </FormControl>
                </div>
            </ModalInfo>
        </>
    );
}

SetTemporaryPasswordModal.propTypes = {
    className: PropTypes.string,
    onSetTemporaryPassword: PropTypes.func,
};

SetTemporaryPasswordModal.defaultProps = {
    className: '',
    onSetTemporaryPassword: () => {},
};

export default SetTemporaryPasswordModal;
