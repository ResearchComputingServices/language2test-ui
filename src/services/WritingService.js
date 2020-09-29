import RestService from './RestService';

class WritingService extends RestService {
    prefix = `${this.prefix}/writings`

    get = this._get;

    add = this._add;

    update = this._update;

    remove = this._remove;

    import = this._import;

    export = this._export;

    count = this._count;
}

const writingService = new WritingService();

Object.freeze(writingService);

export default writingService;

export { WritingService };
