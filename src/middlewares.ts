import error from './error.middleware.ts';
import staticc from './static.middleware.ts';

export default {
    /**
     * A middleware for error-handlings (should be first-ordered).
     */
    error,
    /**
     * For serving static resources (should be last-ordered).
     */
    static: staticc,
};
