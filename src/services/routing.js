class RouterManager {
    constructor() {
        this.router = undefined;
    }

    setRouter(router) {
        this.router = router;
    }

    navigate(location, params) {
        this.router && this.router.navigateToRoute(location, params);
    }
}

export default new RouterManager();