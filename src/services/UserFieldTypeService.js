import RestService from './RestService';

class UserFieldTypeService extends RestService {
    prefix = `${this.prefix}/user_field_types`;

    get = this._get;

    add = this._add;

    update = this._update;

    remove = this._remove;

    export = this._export;

    count = this._count;
}

const userFieldType = new UserFieldTypeService();

Object.freeze(userFieldType);

export default userFieldType;

export { UserFieldTypeService };
