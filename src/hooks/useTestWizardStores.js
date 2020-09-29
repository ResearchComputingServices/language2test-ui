import useStore from './useStore';

export default function useTestWizardStores() {
    return useStore(['vocabularyTest', 'readingComprehensionTest', 'clozeTest', 'writingTest', 'results']);
}
