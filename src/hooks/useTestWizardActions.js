import useActions from './useActions';

export default function useTestWizardActions() {
    return {
        vocabulary: useActions('vocabularyTest'),
        readingComprehension: useActions('readingComprehensionTest'),
        cloze: useActions('clozeTest'),
        writing: useActions('writingTest'),
        results: useActions('results'),
    };
}
