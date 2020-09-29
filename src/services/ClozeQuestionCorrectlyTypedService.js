import RestService from './RestService';

class ClozeQuestionCorrectlyTypedService extends RestService {
    prefix = `${this.prefix}/cloze_question_correctly_typed`

    get = this._get;

    add = this._add;

    update = this._update;

    remove = this._remove;

    export = this._export;

    count = this._count;
}

const clozeQuestionCorrectlyTypedService = new ClozeQuestionCorrectlyTypedService();

Object.freeze(clozeQuestionCorrectlyTypedService);

export default clozeQuestionCorrectlyTypedService;

export { ClozeQuestionCorrectlyTypedService };
