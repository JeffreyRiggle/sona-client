class LoginService {
    constructor() {
        this.token = undefined;
    }

    login() {
        return new Promise((resolve, reject) => {
            this.token = 'testing';
            resolve()
        });
    }

    logout() {
        // TODO
    }
}

export default new LoginService();