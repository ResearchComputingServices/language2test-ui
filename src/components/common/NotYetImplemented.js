import React from 'react';

export default () => {
    const Construction = (
        <span
            aria-labelledby='under-construction'
            role='img'
        >
            🚧
        </span>
    );
    return (
        <div className='my-5 text-center'>
            {Construction}
            Implementation in progress
            {Construction}
        </div>
    );
};
