import RestService from './RestService';

class ClozeQuestionPendingTypedService extends RestService {
    prefix = `${this.prefix}/cloze_question_pending_typed`

    get = this._get;

    add = this._add;

    update = this._update;

    remove = this._remove;

    export = this._export;

    count = this._count;
}

const clozeQuestionPendingTypedService = new ClozeQuestionPendingTypedService();

Object.freeze(clozeQuestionPendingTypedService);

export default clozeQuestionPendingTypedService;

export { ClozeQuestionPendingTypedService };
