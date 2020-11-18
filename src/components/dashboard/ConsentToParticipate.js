import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button } from '../common';

function ConsentToParticipate({ defaultValue, disabled, style, className, onConsent, confirm }) {
    const mapValue = selectedValue => (selectedValue === 'a' ? true : (selectedValue === 'd' ? false : null));
    const unMapValue = defaultValue => (defaultValue === true ? 'a' : (defaultValue === false ? 'd' : null));

    const [selectedValue, setSelectedValue] = React.useState(unMapValue(defaultValue));

    const handleChange = event => {
        const consent = event.target.value;
        setSelectedValue(consent);
        if (!confirm) {
            onConsent(mapValue(consent));
        }
    };

    return (
        <div
            className={className}
            style={style}
        >
            <FormControl component='fieldset'>
                <FormLabel
                    className='my-3'
                    component='legend'
                    style={{ lineHeight: 1.7 }}
                >
                    Your data will be used in research, do you agree to participate?
                </FormLabel>
                <RadioGroup
                    name='consent'
                    onChange={handleChange}
                    value={selectedValue}
                >
                    <FormControlLabel
                        control={<Radio />}
                        disabled={disabled}
                        label='I Agree'
                        value='a'
                    />
                    <FormControlLabel
                        control={<Radio />}
                        disabled={disabled}
                        label='I Disagree'
                        value='d'
                    />
                </RadioGroup>
            </FormControl>
            {confirm && (
                <Button
                    className='mt-4'
                    color='primary'
                    disabled={selectedValue == null}
                    onClick={() => onConsent(mapValue(selectedValue))}
                >
                    Confirm
                </Button>
            )}
        </div>
    );
}

ConsentToParticipate.propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.bool,
    style: PropTypes.object,
    onConsent: PropTypes.func.isRequired,
    confirm: PropTypes.bool,
    disabled: PropTypes.bool,
};

ConsentToParticipate.defaultProps = {
    defaultValue: null,
    className: undefined,
    style: undefined,
    confirm: false,
    disabled: false,
};

export default ConsentToParticipate;
