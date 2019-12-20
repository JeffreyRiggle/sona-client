class RouterManager {
    constructor() {
        this.router = undefined;
    }

    setRouter(router) {
        this.router = router;
    }

    navigate(location) {
        this.router && this.router.navigateToRoute(location);
    }
}

export default new RouterManager();