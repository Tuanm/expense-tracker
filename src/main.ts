import { oak } from '@deps';
import { port } from '@env';
import controllers from '@controllers';
import log from '@log';
import middlewares from '@middlewares';
import { prepareTables } from '@models';

const app = new oak.Application();

app.use(middlewares.error);
app.use(controllers.item.routes());
app.use(controllers.item.allowedMethods());
app.use(middlewares.static);

app.addEventListener('listen', (event) => {
    const protocol = event.secure ? 'https' : 'http';
    log.info(`Listening on ${protocol}://${event.hostname}:${event.port}`);
});

await prepareTables();
await app.listen({ port });
