/* eslint-disable class-methods-use-this */
import { Account } from 'models';
import { Service } from 'typedi';
import { AUTH } from 'config';
import crypto from 'crypto';
import ValidationError from 'errors/ValidationError';

@Service()
export default class AccountService {
	private hashing(pw, salt) {
		return crypto.pbkdf2Sync(pw, salt, 10000, 32, 'sha256').toString('hex');
	}

	public async signUp(id: string, pw: string): Promise<void> {
		try {
			const isExist = await Account.findOne({ where: { userId: id } });
			if (isExist) throw new ValidationError(`${id} is exist already`);
			const salt = crypto.randomBytes(AUTH.SALT_LENGTH_BYTE).toString('hex');
			const saltedPw = this.hashing(pw, salt);
			await Account.create({ userId: id, saltedPw, salt });
		} catch (error: unknown) {
			if (typeof error === 'string' || !(error instanceof Error)) throw error;
			if (error.name === 'SequelizeValidationError') throw new ValidationError(error.message);
			throw error;
		}
	}

	public async signIn(id: string, pw: string): Promise<Account> {
		const account = await Account.findOne({ where: { userId: id } });
		if (account === null) throw new ValidationError(`${id} is not exist`);
		const saltedPw = this.hashing(pw, account.salt);
		if (saltedPw !== account.saltedPw) throw new ValidationError('Not valid password');
		return account;
	}
}
