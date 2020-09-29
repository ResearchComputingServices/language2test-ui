import axios from 'axios';
import RestService from './RestService';

class ClozeService extends RestService {
    prefix = `${this.prefix}/cloze`

    get = this._get;

    add = data => this._add(data);

    update = data => this._update(data);

    generateQuestions = data => axios
        .post(`${this.prefix}/generate_questions`, this._processRequest(data, {}))
        .then(data => this._processResponse(data, {}));

    remove = this._remove;

    import = this._import;

    export = this._export;

    count = this._count;
}

const closeService = new ClozeService();

Object.freeze(closeService);

export default closeService;

export { ClozeService };
