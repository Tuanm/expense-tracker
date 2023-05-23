import { oak } from './deps.ts';

const router = new oak.Router();

router
    .get('/', (context) => {
        context.response.body = 'Hello World!';
    })
    .post('/', (context) => {
        context.response.status = 403;
    });

export default router;
