import Account from '../src/models/Account.model';

declare global {
	namespace Express {
		export interface User extends Account {}
	}
}
