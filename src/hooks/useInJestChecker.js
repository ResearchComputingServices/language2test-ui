export default function useInJestChecker() {
    return process.env.JEST_WORKER_ID !== undefined;
}
