import axios from 'axios';
import _ from 'lodash';
import RestService from './RestService';

class ClozeService extends RestService {
    prefix = `${this.prefix}/cloze`

    _requestTransformer(data) {
        const itemTransformer = item => {
            if (!_.isObject(item) && !_.isNil(item)) {
                return { text: item };
            }
            return item;
        };
        const newQuestions = [];
        _.each(data.questions, data => {
            if (_.isObject(data)) {
                data.options = _.map(data.options, itemTransformer);
                data.acceptedAnswers = _.map(data.acceptedAnswers, itemTransformer);
                newQuestions.push(data);
            }
        });
        data.questions = newQuestions;
        return data;
    }

    get = this._get;

    add = data => this._add(data, { requestTransformers: [this._requestTransformer] });

    update = data => this._update(data, { requestTransformers: [this._requestTransformer] });

    generateQuestions = data => axios
        .post(`${this.prefix}/generate_questions`, this._processRequest(data, {}))
        .then(data => this._processResponse(data, {}));

    generateOptions = data => axios
        .post(`${this.prefix}/generate_options`, this._processRequest(data, {}))
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
