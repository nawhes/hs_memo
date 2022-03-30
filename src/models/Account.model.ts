import { AUTH } from 'config';
import { Table, Column, PrimaryKey, HasMany, Is, DataType, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './BaseModel';
import Memo from './Memo.model';

const VALID_ID = /^[a-z]{1}[a-z0-9_-]{4,20}$/;
const VALID_SALTEDPW = /[a-f0-9]{64}/;
const VALID_SALT = new RegExp(`[a-f0-9]{${AUTH.SALT_LENGTH_BYTE * 2}}`);

@Table({ tableName: 'account', underscored: true, timestamps: false })
export default class Account extends BaseModel<Account> {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@Is(VALID_ID)
	@Column({ type: DataType.STRING(20), allowNull: false })
	userId: string;

	@Is(VALID_SALTEDPW)
	@Column({ type: DataType.STRING(256), allowNull: false })
	saltedPw: string;

	@Is(VALID_SALT)
	@Column({ type: DataType.STRING(AUTH.SALT_LENGTH_BYTE * 2), allowNull: false })
	salt: string;

	@Column(DataType.DATE)
	createdAt?: any;

	@HasMany(() => Memo, 'accountId')
	memos: Memo[];
}
