import logger from './logger';
import humanizeNumber from 'humanize-number';
import bytes from 'bytes';
import Counter from 'passthrough-counter';

export default async function koaLogger(ctx, next) {
	const start = Date.now();
	logger.info(`<-- ${ctx.method} ${ctx.originalUrl}`);
	try {
		await next();
		const length = ctx.response.length;
		const body = ctx.body;
		let counter;
		if (null == length && body && body.readable) {
			ctx.body = body.pipe((counter = Counter())).on('error', ctx.onerror);
		}
		const res = ctx.res;

		function done(event) {
			res.removeListener('finish', onfinish);
			res.removeListener('close', onclose);
			log(ctx, start, counter ? counter.length : length, null, event);
		}

		const onfinish = done.bind(null, 'finish');
		const onclose = done.bind(null, 'close');

		res.once('finish', onfinish);
		res.once('close', onclose);
	} catch (error) {
		log(ctx, start, null, error, null);
		throw error;
	}
}

function log(ctx, start, len, err, event) {
	const status = err ? err.status || 500 : ctx.status || 404;

	// get the human readable response length
	let length;
	if (~[204, 205, 304].indexOf(status)) {
		length = '';
	} else if (null == len) {
		length = '-';
	} else {
		length = bytes(len);
	}

	const upstream = err ? 'xxx' : event === 'close' ? '-x-' : '-->';

	logger.info(`${upstream} ${ctx.method} ${ctx.originalUrl} ${status} ${time(start)} ${length}`);
}

function time(start: number) {
	const delta = Date.now() - start;
	return humanizeNumber(delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's');
}
