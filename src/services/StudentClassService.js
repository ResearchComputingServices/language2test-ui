import _ from 'lodash';
import axios from 'axios';
import RestService from './RestService';

class StudentService extends RestService {
    basePrefix = `${this.prefix}`;

    prefix = `${this.prefix}/student_classes`

    _requestTransformer = data => {
        if (_.isNil(data.name)) {
            data.name = _.snakeCase(data.display);
        }
        return data;
    }

    get = this._get;

    getInstructorClasses = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.basePrefix}/instructor/student_classes`,
        }))
        .then(data => this._processResponse(data, options))

    add = data => this._add(data, { requestTransformers: [this._requestTransformer] });

    update = this._update;

    remove = this._remove;

    export = this._export;

    import = this._import;

    count = this._count;
}

const studentService = new StudentService();

Object.freeze(studentService);

export default studentService;
