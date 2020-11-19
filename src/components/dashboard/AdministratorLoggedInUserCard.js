import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

function AdministratorLoggedInUserCard({
    className,
    style,
    username,
    roles,
    displayName,
    sessionStartTime,
    lastAccessTime,
}) {
    return (
        <Card
            className={clsx('administrator-dashboard-logged-in-user-card-container', className)}
            style={style}
        >
            <CardContent>
                <Typography
                    className='administrator-dashboard-logged-in-user-card-title'
                    color='textSecondary'
                    gutterBottom
                >
                    Username:
                    {' '}
                    {username}
                </Typography>
                <Typography
                    className='pt-1 pb-3'
                    component='h2'
                    variant='h5'
                >
                    {displayName}
                </Typography>
                <Typography
                    className='administrator-dashboard-logged-in-user-card-pos'
                    color='textSecondary'
                >
                    Roles:
                    {' '}
                    {roles}
                </Typography>
                <Typography
                    className='administrator-dashboard-logged-in-user-card-pos'
                    color='textSecondary'
                >
                    Session Start Time:
                    {' '}
                    {sessionStartTime}
                </Typography>
                <Typography
                    className='administrator-dashboard-logged-in-user-card-pos'
                    color='textSecondary'
                >
                    Last Access Time:
                    {' '}
                    {lastAccessTime}
                </Typography>
            </CardContent>
        </Card>
    );
}

AdministratorLoggedInUserCard.propTypes = {
    username: PropTypes.string,
    roles: PropTypes.string,
    displayName: PropTypes.string,
    sessionStartTime: PropTypes.string,
    lastAccessTime: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
};

AdministratorLoggedInUserCard.defaultProps = {
    username: 'Unknown',
    roles: 'Unknown',
    displayName: 'Unknown',
    sessionStartTime: 'Unknown',
    lastAccessTime: 'Unknown',
    className: undefined,
    style: undefined,
};

export default AdministratorLoggedInUserCard;
