import RestService from './RestService';

class RoleService extends RestService {
    prefix = `${this.prefix}/roles`

    get = this._get;

    add = this._add;

    update = this._update;

    remove = this._remove;

    count = this._count;
}

const roleService = new RoleService();

Object.freeze(roleService);

export default roleService;

export { RoleService };
