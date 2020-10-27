import useProvider from './useProvider';

export default function useRolesCheckerService() {
    return useProvider('rolesChecker')();
}
