import 'reflect-metadata';
import logger from 'loaders/logger';
import { PORT } from './config/index';
import 'loaders/sequelize';
import app from './loaders/koa';

function run() {
	app.listen(PORT);
	logger.info(`Server running on ${PORT}`);
}

run();
