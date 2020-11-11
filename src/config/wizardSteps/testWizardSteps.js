import DemographicQuestionnaire from '../../components/demographicQuestionnaire';
import Vocabulary from '../../components/vocabularyTest';
import ReadingComprehension from '../../components/readingComprehensionTest';
import Cloze from '../../components/clozeTest';
import Writing from '../../components/writingTest';

export default {
    demographicQuestionnaire: {
        title: 'Demographic Questionnaire',
        stepComponent: DemographicQuestionnaire,
    },
    vocabulary: {
        title: 'M/C Vocabulary',
        storeName: 'vocabularyTest',
        stepComponent: Vocabulary,
    },
    readingComprehension: {
        title: 'Reading Comprehension',
        storeName: 'readingComprehensionTest',
        stepComponent: ReadingComprehension,
    },
    cloze: {
        title: 'Cloze',
        storeName: 'clozeTest',
        stepComponent: Cloze,
    },
    writing: {
        title: 'Writing',
        storeName: 'writingTest',
        stepComponent: Writing,
    },
};
