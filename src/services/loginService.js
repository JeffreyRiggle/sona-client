import httpManager from './httpManager';

class LoginService {
    constructor() {
        this.token = undefined;
    }

    login(email, password) {
        return httpManager.post('/sona/v1/authenticate', { email, password }).then(response => {
            this.token = response.token;
            httpManager.addDefaultHeader({
                key: 'X-Sona-Token',
                value: this.token
            });
        }).catch(err => {
            console.log(err);
            this.token = 'testing';
        });
    }

    logout() {
        // TODO
    }
}

export default new LoginService();