import _ from 'lodash';
import useRolesCheckerService from './useRolesCheckerService';

function getButton(authorizationCheckerService, title, handler, options = {}) {
    const skipAuthorization = _.get(options, 'skipAuthorization', false);
    const authorization = _.get(options, 'authorization', null);
    const hasAuthorization = skipAuthorization ? true : (authorization ? (authorizationCheckerService.has(authorization)) : true);
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

export default function useFormButtons(id, entity, handlers, disableMutation = false, disableDelete = false, skipAuthorization = false) {
    const authorizationCheckerService = useRolesCheckerService();
    const { create, update, remove, download, cancel } = handlers;
    entity = _.kebabCase(entity);
    return [
        _.isNil(id) ? getButton(authorizationCheckerService, 'Create', create, {
            disabled: disableMutation,
            authorization: `create-${entity}`,
            skipAuthorization,
        }) : null,
        _.isNil(id) ? null : getButton(authorizationCheckerService, 'Update', update, {
            disabled: disableMutation,
            authorization: `update-${entity}`,
            skipAuthorization,
        }),
        _.isNil(id) ? null : getButton(authorizationCheckerService, 'Delete', remove, {
            disabled: disableDelete,
            authorization: `delete-${entity}`,
            skipAuthorization,
        }),
        _.isNil(id) ? null : getButton(authorizationCheckerService, 'Export', download, { authorization: `export-${entity}` }),
        getButton(authorizationCheckerService, 'Cancel', cancel, { type: 'utility' }),
    ];
}
