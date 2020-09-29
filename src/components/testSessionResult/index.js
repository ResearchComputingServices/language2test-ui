import React from 'react';
import _ from 'lodash';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import VocabularyResult from '../vocabularyTest/Result';
import WritingResult from '../writingTest/Result';
import ReadingComprehensionResult from '../readingComprehensionTest/Result';
import ClozeResult from '../clozeTest/Result';
import ResultHeader from '../result/ResultHeader';

function TestSessionResults({ data }) {
    const resultsComponents = {
        vocabulary: {
            title: 'Vocabulary',
            Component: VocabularyResult,
        },
        writing: {
            title: 'Writing',
            Component: WritingResult,
        },
        rc: {
            title: 'Reading Comprehension',
            Component: ReadingComprehensionResult,
        },
        cloze: {
            title: 'Cloze',
            Component: ClozeResult,
        },
    };

    const getResultComponent = (testType, result) => {
        if (testType in resultsComponents) {
            const { Component } = resultsComponents[testType];
            return (
                <Component
                    questions={_.get(data, ['test', `test${_.capitalize(testType)}`])}
                    result={result}
                />
            );
        }
        return null;
    };

    const getResults = data => {
        const results = {};
        _.each(resultsComponents, (value, key) => {
            const reconstructedKey = `results${_.capitalize(key)}`;
            if (reconstructedKey in data && !_.isEmpty(data[reconstructedKey])) {
                results[key] = data[reconstructedKey];
            }
        });
        return results;
    };

    return (
        <div className='form-section'>
            <div>
                {_.map(getResults(data), (result, testType) => (
                    <div key={`${testType}`}>
                        <Divider className='mt-5 mb-5' />
                        <ResultHeader
                            className='mb-5'
                            title={_.get(resultsComponents, [testType, 'title'], 'Unknown')}
                        />
                        {getResultComponent(testType, result)}
                    </div>
                ))}
            </div>
        </div>
    );
}

TestSessionResults.propTypes = { data: PropTypes.object.isRequired };

export default TestSessionResults;
