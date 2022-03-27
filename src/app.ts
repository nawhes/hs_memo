import 'reflect-metadata';
import { PORT } from './config/index';
import logger from 'loaders/logger';
import 'loaders/sequelize';
import app from './loaders/koa';

function run() {
	app.listen(PORT);
	logger.info(`Server running on ${PORT}`);
}

run();
