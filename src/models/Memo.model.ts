import { Table, Column, Model, PrimaryKey, ForeignKey, DataType } from 'sequelize-typescript';
import Account from './Account.model';

@Table({ tableName: 'memo', underscored: true })
export default class Memo extends Model {
	@PrimaryKey
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
