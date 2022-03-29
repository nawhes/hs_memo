import { Table, Column, Model, PrimaryKey, ForeignKey, DataType, AutoIncrement } from 'sequelize-typescript';
import { Service } from 'typedi';
import Account from './Account.model';
import BaseModel from './BaseModel';

@Service()
@Table({ tableName: 'memo', underscored: true })
export default class Memo extends BaseModel<Memo> {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@ForeignKey(() => Account)
	@Column
	userid: number;

	@Column(DataType.STRING(20))
	head: string;

	@Column(DataType.TEXT)
	body: string;

	@Column(DataType.DATE)
	createdAt?: any;

	@Column(DataType.DATE)
	updatedAt?: any;
}
