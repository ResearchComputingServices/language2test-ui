import _ from 'lodash';
import RestService from './RestService';

class ReadingComprehension extends RestService {
    prefix = `${this.prefix}/rc`

    _requestTransformer = data => {
        if (_.isArray(data)) return data;
        const name = _.get(data, 'name');
        const questions = _.get(data, 'questions', []);
        const filteredQuestions = [];
        for (let i = 0; i < questions.length; ++i) {
            const index = i;
            const question = questions[i];
            if (_.values(question).some(v => _.isNil(v) || (!_.isNumber(v) && _.isEmpty(v)))) continue;
            const options = _.get(question, 'options', []);
            question.options = options.map(option => (!_.isObject(option) ? {
                text: option,
                rcQuestion: index + 1,
            } : option));
            _.assign(question, {
                rc: name,
                rcName: name,
            });
            filteredQuestions.push(question);
        }
        data.questions = filteredQuestions;
        return data;
    }

    get = this._get;

    add = data => this._add(data, { requestTransformers: [this._requestTransformer] })

    update = data => this._update(data, { requestTransformers: [this._requestTransformer] })

    remove = this._remove;

    import = this._import;

    export = this._export;

    count = this._count;
}

const readingComprehension = new ReadingComprehension();

Object.freeze(readingComprehension);

export default readingComprehension;

export { ReadingComprehension };
