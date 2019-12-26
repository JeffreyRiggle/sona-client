import httpManager from './httpManager';

class LoginService {
    constructor() {
        this.token = localStorage.getItem('auth') || '';

        if (this.token) {
            this.token = JSON.parse(this.token).value;
            this.setToken();
        }
    }

    setToken() {
        httpManager.addDefaultHeader({
            key: 'X-Sona-Token',
            value: this.token
        });
    }

    login(emailAddress, password) {
        return httpManager.post('/sona/v1/authenticate', JSON.stringify({ emailAddress, password }), [{ key: 'Content-Type', value: 'application/json' }]).then(response => {
            this.token = response.token;
            localStorage.setItem('auth', JSON.stringify({value: this.token}));
            this.setToken();
        }).catch(err => {
            console.log(err);
            this.token = '';
        });
    }

    logout() {
        // TODO
    }
}

export default new LoginService();