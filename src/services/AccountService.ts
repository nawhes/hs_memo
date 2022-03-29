import { DataAccessError } from 'errors/DataAccessError';
import Account from 'models/Account.model';
import { Service } from 'typedi';

@Service()
export default class AccountService {
	//todo
	public async signUp(id: string, pw: string): Promise<Account> {
		const result = await Account.create({ userid: id, saltedPw: pw });
		if (result) return result;
		throw new Error();
	}

	//todo
	public async signIn(id: string, pw: string): Promise<Account> {
		const result = await Account.findOne({ where: { userid: id, saltedPw: pw } });
		if (result) return result;
		throw new Error();
	}
}
