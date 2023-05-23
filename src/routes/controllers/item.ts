import { oak } from '@deps';
import services from '@services';
import { createPageableResponse, getPageableRequest } from '@utils';

const router = new oak.Router();

router
    .get('/', async (context) => {
        const { page, size } = getPageableRequest(context);
        const name = context.request.url.searchParams.get('name');
        const { data, total } = name
            ? await services.item.searchByName(
                name as string,
                page,
                size,
            )
            : await services.item.search(page, size);
        context.response.body = createPageableResponse(
            data,
            page,
            size,
            total,
        );
    })
    .post('/', async (context) => {
        const { name, cost } =
            await context.request.body({ type: 'json' }).value || {};
        await services.item.add(name as string, Number(cost));
    });

export default router;
