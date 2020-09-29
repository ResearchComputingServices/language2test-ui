import RestService from './RestService';

class UserService extends RestService {
    prefix = `${this.prefix}/test_sessions`;

    get = (query, options = {}) => this._get(query, { ...options });

    add = data => this._add(data)

    update = data => this._update(data)

    remove = data => this._remove(data);

    export = this._export;

    count = this._count;
}

const userService = new UserService();

Object.freeze(userService);

export default userService;

export { userService };
