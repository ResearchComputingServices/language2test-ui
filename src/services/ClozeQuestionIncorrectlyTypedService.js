import RestService from './RestService';

class ClozeQuestionIncorrectlyTypedService extends RestService {
    prefix = `${this.prefix}/cloze_question_incorrectly_typed`

    get = this._get;

    add = this._add;

    update = this._update;

    remove = this._remove;

    export = this._export;

    count = this._count;
}

const clozeQuestionIncorrectlyTypedService = new ClozeQuestionIncorrectlyTypedService();

Object.freeze(clozeQuestionIncorrectlyTypedService);

export default clozeQuestionIncorrectlyTypedService;

export { ClozeQuestionIncorrectlyTypedService };
