import RestService from './RestService';

class AuthorizationService extends RestService {
    prefix = `${this.prefix}/authorization`

    get = this._get;

    add = this._add;

    update = this._update;

    remove = this._remove;

    count = this._count;
}

const authorizationService = new AuthorizationService();

Object.freeze(authorizationService);

export default authorizationService;

export { AuthorizationService };
