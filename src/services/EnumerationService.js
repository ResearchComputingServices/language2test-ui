import RestService from './RestService';

class EnumerationService extends RestService {
    prefix = `${this.prefix}/enumerations`

    get = this._get;

    add = this._add;

    update = this._update;

    remove = this._remove;

    export = this._export;

    import = this._import;

    count = this._count;
}

const enumerationService = new EnumerationService();

Object.freeze(enumerationService);

export default enumerationService;

export { EnumerationService };
