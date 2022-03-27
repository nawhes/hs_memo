import AccountRepository from 'repositories/AccountRepository';
import { Service } from 'typedi';

@Service()
export default class AccountService {
	constructor(private accountRepository: AccountRepository) {}

	//todo
	public async signUp() {
		await this.accountRepository.insert('sample');
	}

	//todo
	public async signIn() {
		await this.accountRepository.find('sampleid', 'samplepw');
	}
}
