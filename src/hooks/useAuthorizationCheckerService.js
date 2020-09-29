import useProvider from './useProvider';

export default function useAuthorizationCheckerService() {
    return useProvider('authorizationChecker')();
}
