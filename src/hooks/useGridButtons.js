import _ from 'lodash';
import useRolesCheckerService from './useRolesCheckerService';

function getButton(rolesCheckerService, handler, options = {}) {
    const skipAuthorization = _.get(options, 'skipAuthorization', false);
    const authorization = _.get(options, 'authorization', null);
    const hasAuthorization = skipAuthorization ? true : (authorization ? (rolesCheckerService.has(authorization)) : true);
    if (!_.isFunction(handler) || !hasAuthorization) {
        return null;
    }
    return handler;
}

export default function useGridButtons(handlers, authorizations = {}, skipAuthorization = false) {
    const rolesCheckerService = useRolesCheckerService();
    const {
        onCreate,
        onExport,
        onImport,
        onRowClick,
    } = handlers;
    return {
        onCreate: getButton(rolesCheckerService, onCreate, {
            authorization: authorizations.create,
            skipAuthorization,
        }),
        onExport: getButton(rolesCheckerService, onExport, {
            authorization: authorizations.export,
            skipAuthorization,
        }),
        onImport: getButton(rolesCheckerService, onImport, {
            authorization: authorizations.import,
            skipAuthorization,
        }),
        onRowClick: getButton(rolesCheckerService, onRowClick, {
            authorization: authorizations.read,
            skipAuthorization,
        }),
    };
}
