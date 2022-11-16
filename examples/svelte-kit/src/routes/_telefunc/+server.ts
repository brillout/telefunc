import { telefunc } from 'telefunc';
import type { RequestHandler } from './$types';

const GET: RequestHandler = async (event) => {
	const response = await telefunc({
		url: event.request.url,
		method: event.request.method,
		body: await event.request.text(),
		context: {
			// We pass the `context` object here, see https://telefunc.com/getContext
			someContext: 'hello'
		}
	});
	return new Response(response.body, {
		headers: new Headers({ contentType: response.contentType }),
		status: response.statusCode
	});
};

export { GET, GET as POST };
