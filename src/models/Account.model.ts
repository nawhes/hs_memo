import { Table, Column, Model, PrimaryKey, HasMany, Is, DataType } from 'sequelize-typescript';
import BaseModel from './BaseModel';
import Memo from './Memo.model';

const VALID_ID = /./;

@Table({ tableName: 'account', underscored: true })
export default class Account extends BaseModel {
	@PrimaryKey
	@Column
	id: number;

	@Is('ID', (value) => {
		if (!VALID_ID.test(value)) {
			throw new Error(`"${value}" is invalid for user id.`);
		}
	})
	@Column(DataType.STRING(20))
	userid: string;

	@Column(DataType.STRING(256))
	saltedPw: string;

	@Column(DataType.DATE)
	createdAt?: any;

	@HasMany(() => Memo, 'userid')
	memos: Memo[];
}
