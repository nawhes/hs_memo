import BaseRepository from './BaseRepository';
import Account from 'models/Account.model';
import { Service } from 'typedi';

@Service()
export default class AccountRepository extends BaseRepository<Account> {
	constructor() {
		super(Account);
	}

	//todo
	public async insert(data: any) {}

	//todo
	public async find(id: string, pw: string) {}
}
