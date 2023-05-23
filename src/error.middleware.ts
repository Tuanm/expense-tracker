import { oak } from './deps.ts';

export default async (context: oak.Context, next: oak.Next) => {
    try {
        await next();
    } catch (err) {
        if (oak.isHttpError(err)) {
            switch (err.status) {
                case oak.Status.InternalServerError:
                    context.response.body = 'Whoops!';
                    break;
                default:
                    throw err;
            }
        } else {
            throw err;
        }
    }
};
