import humanizeNumber from 'humanize-number';
import bytes from 'bytes';
import Counter from 'passthrough-counter';
import logger from './logger';

function time(start: number) {
	const delta = Date.now() - start;
	return humanizeNumber(delta < 10000 ? `${delta}ms` : `${Math.round(delta / 1000)}s`);
}

function log(ctx, start, len, err, event) {
	const status = err ? err.status || 500 : ctx.status || 404;

	// get the human readable response length
	let length;
	if (![204, 205, 304].indexOf(status)) {
		length = '';
	} else if (len == null) {
		length = '-';
	} else {
		length = bytes(len);
	}

	let upstream;
	if (err) {
		upstream = 'xxx';
	} else if (event === 'close') {
		upstream = '-x-';
	} else {
		upstream = '-->';
	}

	logger.info(`${upstream} ${ctx.method} ${ctx.originalUrl} ${status} ${time(start)} ${length}`);
}

export default async function koaLogger(ctx, next) {
	const start = Date.now();
	logger.info(`<-- ${ctx.method} ${ctx.originalUrl}`);
	try {
		await next();
		const { length } = ctx.response;
		const { body } = ctx;
		let counter;
		if (length == null && body && body.readable) {
			ctx.body = body.pipe((counter = Counter())).on('error', ctx.onerror);
		}

		const [onClose, onFinish] = [
			() => {
				ctx.res.removeListener('finish', onFinish);
				log(ctx, start, counter ? counter.length : length, null, 'finish');
			},
			() => {
				ctx.res.removeListener('close', onClose);
				log(ctx, start, counter ? counter.length : length, null, 'finish');
			},
		];

		ctx.res.once('finish', onFinish);
		ctx.res.once('close', onClose);
	} catch (error) {
		log(ctx, start, null, error, null);
		throw error;
	}
}
