import { Sequelize } from 'sequelize-typescript';
import { DB } from '../config/index';
import path from 'path';
import logger from './logger';
import Container from 'typedi';
import Account from 'models/Account.model';

const modelsDirectory = path.resolve(process.cwd(), 'src', 'models');

const sequelize = new Sequelize(`postgres://${DB.USER}:${DB.PW}@${DB.HOST}:${DB.PORT}/${DB.NAME}`, {
	models: [modelsDirectory + '/**/*.model.ts'],
});

sequelize
	.authenticate()
	.then(() => {
		logger.info('Connection has been established successfully.');
	})
	.catch((error) => {
		logger.error('Unable to connect to the database:', error);
		throw error;
	});

Container.set(Sequelize, sequelize);
