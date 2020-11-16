import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import cssAppData from '../root/_appData.scss';
import logo from '../../assets/images/carleton.svg';

const Logo = ({ width, height, className, style }) => (
    <>
        <img
            alt='Carleton University'
            className={clsx(className, 'logo')}
            height={height}
            src={logo}
            style={style}
            width={width}
        />
    </>
);

Logo.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object,
};

Logo.defaultProps = {
    height: parseInt(cssAppData.navBar, 0) || 64,
    width: undefined,
    className: '',
    style: undefined,
};

export default Logo;
