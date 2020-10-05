import _ from 'lodash';
import RestService from './RestService';

class TestService extends RestService {
    prefix = `${this.prefix}/test`

    pickedValues = [
        'id',
        'name',
        'order',
        'testUserFieldCategory',
        'mandatoryTestUserFieldCategory',
        'testStudent',
        'testStudentClass',
        'immutable',
        'unremovable',
    ]

    _responeTransformer = data => {
        const preProcessData = data => {
            const steps = [];
            const readingComprehensions = _.get(data, 'testRc');
            const vocabularies = _.get(data, 'testVocabulary');
            const clozes = _.get(data, 'testCloze');
            const writings = _.get(data, 'testWriting');
            const order = _.uniq(_.get(data, 'order'));
            const typeMap = {
                Vocabulary: vocabularies,
                'Reading Comprehension': readingComprehensions,
                Cloze: clozes,
                Writing: writings,
            };
            if (_.isEmpty(order)) {
                if (!_.isEmpty(vocabularies)) {
                    steps.push({
                        type: 'Vocabulary',
                        values: typeMap.Vocabulary,
                    });
                }
                if (!_.isEmpty(readingComprehensions)) {
                    steps.push({
                        type: 'Reading Comprehension',
                        values: typeMap['Reading Comprehension'],
                    });
                }
                if (!_.isEmpty(clozes)) {
                    steps.push({
                        type: 'Cloze',
                        values: typeMap.Cloze,
                    });
                }
                if (!_.isEmpty(writings)) {
                    steps.push({
                        type: 'Writing',
                        values: typeMap.Writing,
                    });
                }
            } else {
                _.each(order, item => {
                    if (item in typeMap) {
                        steps.push({
                            type: item,
                            values: typeMap[item],
                        });
                    }
                });
            }
            const processedData = _.pick(data, this.pickedValues);
            processedData.steps = steps;
            return processedData;
        };
        if (_.isArray(data)) return data.map(preProcessData);
        if (_.isEmpty(data)) return data;
        return preProcessData(data);
    }

    _requestTransformer = data => {
        const postProcessData = data => {
            let testRc = [];
            let testVocabulary = [];
            let testCloze = [];
            let testWriting = [];
            const order = [];
            const { steps } = data;
            _.each(steps, step => {
                if (_.eq(step.type, 'Vocabulary')) {
                    testVocabulary = step.values;
                    if (!_.isEmpty(testVocabulary)) {
                        order.push(step.type);
                    }
                }
                if (_.eq(step.type, 'Reading Comprehension')) {
                    testRc = step.values;
                    if (!_.isEmpty(testRc)) {
                        order.push(step.type);
                    }
                }
                if (_.eq(step.type, 'Cloze')) {
                    testCloze = step.values;
                    if (!_.isEmpty(testCloze)) {
                        order.push(step.type);
                    }
                }
                if (_.eq(step.type, 'Writing')) {
                    testWriting = step.values;
                    if (!_.isEmpty(testWriting)) {
                        order.push(step.type);
                    }
                }
            });
            return {
                ..._.pick(data, this.pickedValues),
                testRc,
                testVocabulary,
                testCloze,
                testWriting,
                order: _.uniq(order),
            };
        };
        if (_.isArray(data)) return data.map(postProcessData);
        return postProcessData(data);
    }

    get = (query, options = {}) => this._get(query, {
        ...options,
        responseTransformers: [this._responeTransformer],
    })

    add = data => this._add(data, {
        requestTransformers: [this._requestTransformer],
        responseTransformers: [this._responeTransformer],
    })

    update = data => this._update(data, {
        requestTransformers: [this._requestTransformer],
        responseTransformers: [this._responeTransformer],
    })

    remove = this._remove;

    export = this._export;

    count = this._count;
}

const testService = new TestService();

Object.freeze(testService);

export default testService;

export { testService };
