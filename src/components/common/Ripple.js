import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import sassTheme from '../root/_theme.scss';

export default function Ripple({ color, className, style, size }) {
    const circles = [...Array(2)].map((_, index) => (
        <div
            key={index}
            style={{
                borderColor: `${color}`,
                borderWidth: size * 0.05,
            }}
        />
    ));

    return (
        <div
            className={clsx('lds-ripple', className)}
            style={{ width: size, height: size, ...style }}
        >
            {circles}
        </div>
    );
}

Ripple.propTypes = {
    color: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.number,
};

Ripple.defaultProps = {
    color: sassTheme.primary,
    className: '',
    style: {},
    size: 80,
};
