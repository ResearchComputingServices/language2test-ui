import React from 'react';

export default () => {
    const Question = (
        <span
            aria-labelledby='question'
            role='img'
        >
            ❓
        </span>
    );
    return (
        <div className='my-5 text-center'>
            {Question}
            400 Bad Request
            {Question}
        </div>
    );
};
