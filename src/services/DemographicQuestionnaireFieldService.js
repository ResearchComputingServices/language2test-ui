import _ from 'lodash';
import RestService from './RestService';

class DemographicQuestionnaireFieldService extends RestService {
    prefix = `${this.prefix}/user_field_categories`

    _requestTransformer = data => {
        if (_.isNil(data.name)) {
            data.name = _.snakeCase(data.display);
        }
        return data;
    }

    get = this._get;

    add = data => this._add(data, { requestTransformers: [this._requestTransformer] });

    update = this._update;

    remove = this._remove;

    export = this._export;

    count = this._count;
}

const demographicQuestionnaireFieldService = new DemographicQuestionnaireFieldService();

Object.freeze(demographicQuestionnaireFieldService);

export default demographicQuestionnaireFieldService;

export { DemographicQuestionnaireFieldService };
