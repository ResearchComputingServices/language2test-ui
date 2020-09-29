import _ from 'lodash';
import useAuthorizationCheckerService from './useAuthorizationCheckerService';

function getButton(authorizationCheckerService, title, handler, options = {}) {
    const authorization = _.get(options, 'authorization', null);
    const hasAuthorization = (authorization ? (authorizationCheckerService.has(authorization)) : true);
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

export default function useFormButtons(id, entity, handlers, disableMutation = false) {
    const authorizationCheckerService = useAuthorizationCheckerService();
    const { create, update, remove, download, cancel } = handlers;
    entity = _.kebabCase(entity);
    return [
        _.isNil(id) ? getButton(authorizationCheckerService, 'Create', create, {
            disabled: disableMutation,
            authorization: `create-${entity}`,
        }) : null,
        _.isNil(id) ? null : getButton(authorizationCheckerService, 'Update', update, {
            disabled: disableMutation,
            authorization: `update-${entity}`,
        }),
        _.isNil(id) ? null : getButton(authorizationCheckerService, 'Delete', remove, {
            disabled: disableMutation,
            authorization: `delete-${entity}`,
        }),
        _.isNil(id) ? null : getButton(authorizationCheckerService, 'Export', download, { authorization: `export-${entity}` }),
        getButton(authorizationCheckerService, 'Cancel', cancel, { type: 'utility' }),
    ];
}
