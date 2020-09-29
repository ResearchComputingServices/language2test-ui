import { AuthorizationCheckerService } from '../services/AuthorizationCheckerService';

export default authorizations => new AuthorizationCheckerService(authorizations);
