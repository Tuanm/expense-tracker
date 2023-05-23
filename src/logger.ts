import { Logger } from './deps.ts';

const logger = new Logger();

await logger.initFileLogger('logs', {
    rotate: true,
});

export default logger;
