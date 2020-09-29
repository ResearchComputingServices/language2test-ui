import _ from 'lodash';
import RestService from './RestService';

class VocabularyService extends RestService {
    prefix = `${this.prefix}/vocabulary`;

    _responseTransformer(data) {
        const transform = data => {
            if (!_.isEmpty(data)) {
                data.options = _.map(data.options, option => (_.isObject(option) ? option.text : option));
            }
            return data;
        };
        return _.isArray(data)
            ? _.map(data, datum => transform(datum))
            : transform(data);
    }

    _requestTransformer(data) {
        data.options = _.map(data.options, option => ({ text: option }));
        return data;
    }

    get = (query, options = {}) => this._get(query, {
        ...options,
        responseTransformers: [this._responseTransformer],
    })

    add = data => this._add(data, {
        requestTransformers: [this._requestTransformer],
        responseTransformers: [this._responseTransformer],
    });

    update = data => this._update(data, {
        requestTransformers: [this._requestTransformer],
        responseTransformers: [this._responseTransformer],
    });

    remove = this._remove;

    export = this._export;

    import = this._import;

    count = this._count;
}

const vocabularyService = new VocabularyService();

Object.freeze(vocabularyService);

export default vocabularyService;

export { VocabularyService };
