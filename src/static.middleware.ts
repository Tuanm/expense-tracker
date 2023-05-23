import { oak, path } from './deps.ts';

export default async (context: oak.Context, next: oak.Next) => {
    try {
        await context.send({
            root: path.resolve(Deno.cwd(), 'public'),
            index: 'index.html',
        });
    } catch {
        await next();
    }
};
