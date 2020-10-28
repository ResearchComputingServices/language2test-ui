import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from '@material-ui/core';
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function Header({
    name,
    onViewAsChange,
    roles,
    defaultRoleValue,
}) {
    const [age, setAge] = React.useState(defaultRoleValue);

    const handleChange = event => {
        setAge(event.target.value);
        onViewAsChange(event.target.value);
    };

    return (
        <>
            <div className='dashboard-header-container'>
                <div className='dashboard-welcome-container p-4'>
                    <Typography variant='h5'>
                        {`Welcome back, ${name}`}
                    </Typography>
                    <Typography
                        className='dashboard-welcome-date'
                        variant='subtitle1'
                    >
                        {moment().format('dddd, D MMMM YYYY')}
                    </Typography>
                </div>
                {(roles.length > 1 && (
                    <FormControl className='dashboard-roles-selectable'>
                        <InputLabel>View As</InputLabel>
                        <Select
                            onChange={handleChange}
                            value={age}
                        >
                            {roles.map(role => (
                                <MenuItem
                                    key={role}
                                    value={role}
                                >
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ))}
            </div>
            <Divider />
        </>
    );
}

Header.propTypes = {
    name: PropTypes.string,
    onViewAsChange: PropTypes.func,
    roles: PropTypes.array,
    defaultRoleValue: PropTypes.string.isRequired,
};

Header.defaultProps = {
    name: 'Anonymous',
    onViewAsChange: () => {},
    roles: [],
};

export default Header;
