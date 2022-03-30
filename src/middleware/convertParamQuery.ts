const isNumeric = (value: any): boolean => {
	return !Number.isNaN(value - parseFloat(value));
};

const convert = (value) => {
	if (typeof value === 'string') {
		if (value === 'null') return null;
		if (value === 'undefined') return undefined;
		if (value === 'true') return value === 'true';
		if (isNumeric(value)) return Number(value);
		return value;
	}
	if (typeof value === 'object') {
		if (Array.isArray(value)) return value.map((x) => convert(x));
		const obj = value;
		Object.keys(value).forEach((key) => {
			obj[key] = convert(value[key]);
		});
		return obj;
	}
	return value;
};

export default function convertParamQuery(ctx, next): Promise<void> {
	convert(ctx.request.query);
	convert(ctx.request.param);
	return next();
}