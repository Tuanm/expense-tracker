import home from './home.controller.ts';

export default {
    /**
     * `/home` router.
     */
    home: home.prefix('/home'),
};
