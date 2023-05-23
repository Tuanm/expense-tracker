import error from './error.ts';
import staticc from './static.ts';

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
