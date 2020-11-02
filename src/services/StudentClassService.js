import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import RestService from './RestService';

class StudentService extends RestService {
    prefix = `${this.prefix}/student_classes`

    _requestTransformer = data => {
        if (_.isNil(data.name)) {
            // TODO - Backend is a hack, this is an attempt to make things workable.
            data.name = uuidv4();
        }
        return data;
    }

    get = this._get;

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
