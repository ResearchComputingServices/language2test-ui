import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from './LinearProgress';
import Spinner from './Spinner';
import Error from './Error';

function Layout({ children, className, loading, error, unmountOnLoad, linearProgress }) {
    return (
        <div className='layout-container'>
            {loading && !error && (
                <div className={`${!linearProgress ? 'spinner' : 'progress-bar'}`}>
                    {!linearProgress && <Spinner />}
                    {linearProgress && <LinearProgress />}
                </div>
            )}
            <div className={`layout ${!loading && !error ? className : ''} ${loading ? 'layout-loading' : ''}`}>
                {!error && (!unmountOnLoad ? children : !loading && children)}
                {error && <Error error={error} />}
            </div>
        </div>
    );
}

Layout.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.node,
    unmountOnLoad: PropTypes.bool,
    linearProgress: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
    ]),
};

Layout.defaultProps = {
    loading: false,
    children: null,
    unmountOnLoad: false,
    error: false,
    linearProgress: false,
    className: '',
};

export default Layout;
