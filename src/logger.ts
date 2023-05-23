import { Logger } from '@deps';

const logger = new Logger();

await logger.initFileLogger('logs', {
    rotate: true,
});

export default logger;
