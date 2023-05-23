import { oak } from './deps.ts';
import { port } from './env.ts';
import controllers from './controllers.ts';
import log from './logger.ts';
import middlewares from './middlewares.ts';

const app = new oak.Application();

app.use(middlewares.error);
app.use(controllers.home.routes());
app.use(controllers.home.allowedMethods());
app.use(middlewares.static);

app.addEventListener('listen', (event) => {
    const protocol = event.secure ? 'https' : 'http';
    log.info(`Listening on ${protocol}://${event.hostname}:${event.port}`);
});

await app.listen({ port });
