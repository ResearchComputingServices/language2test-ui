import React from 'react';

export default () => {
    const Block = (
        <span
            aria-labelledby='block'
            role='img'
        >
            🚫
        </span>
    );
    return (
        <div className='my-5 text-center'>
            {Block}
            403 Permission Denied
            {Block}
        </div>
    );
};
