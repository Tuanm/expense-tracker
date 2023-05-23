import log from '@log';
import { sleep } from '@utils';
export * as Item from './Item.ts';
import * as Item from './Item.ts';

export async function prepareTables() {
    log.info('Loading necessary tables');
    Item.createTable();
    await sleep(1234);
    log.info('Necessary tables loaded');
}
