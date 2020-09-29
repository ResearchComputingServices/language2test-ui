import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useService } from '../../hooks';

function Authorization({
    children,
    authorization,
    authorizations,
    operator,
}) {
    authorizations = _.isArray(authorizations) ? authorizations : [authorizations];
    !_.isNil(authorization) && !_.isEmpty(authorization) && authorizations.push(authorization);
    authorizations = _.uniq(authorizations);
    const authService = useService('authorization');
    return (
        <>
            {
                authService.has(authorizations, { operator })
                    ? children
                    : null
            }
        </>
    );
}

Authorization.propTypes = {
    children: PropTypes.node.isRequired,
    authorization: PropTypes.string,
    authorizations: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    operator: PropTypes.string,
};

Authorization.defaultProps = {
    authorization: undefined,
    authorizations: [],
};

Authorization.defaultProps = { operator: 'and' };

export default Authorization;
