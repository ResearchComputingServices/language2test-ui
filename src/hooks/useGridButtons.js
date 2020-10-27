import _ from 'lodash';
import useRolesCheckerService from './useRolesCheckerService';

function getButton(rolesCheckerService, title, handler, options = {}) {
    const skipAuthorization = _.get(options, 'skipAuthorization', false);
    const authorization = _.get(options, 'authorization', null);
    const hasAuthorization = skipAuthorization ? true : (authorization ? (rolesCheckerService.has(authorization)) : true);
    if (_.isBoolean(handler) && !handler) {
        return {
            title,
            handler,
            ...options,
            disabled: true,
        };
    }
    if (!_.isFunction(handler) || !hasAuthorization) {
        return null;
    }
    return {
        title,
        handler,
        ...options,
    };
}

export default function useGridButtons(
    id, handlers, authorizations = {}, skipAuthorization = false,
) {
    const rolesCheckerService = useRolesCheckerService();
    const { create } = handlers;
    return [
        _.isNil(id) ? getButton(rolesCheckerService, 'Create', create, {
            authorization: authorizations.create,
            skipAuthorization,
        }) : null,
    ];
}
