import httpManager from './httpManager';
import dayjs from 'dayjs';

class LoginService {
    constructor() {
        this.token = localStorage.getItem('auth') || '';

        if (!this.token) {
            return;
        }

        const tokenInfo = JSON.parse(this.token);

        if (!tokenInfo.timeout || tokenInfo.timeout <= Date.now()) {
            localStorage.removeItem('auth');
            return;
        }

        this.token = tokenInfo.value;
        this.setToken();
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
            localStorage.setItem('auth', JSON.stringify({value: this.token, timeout: dayjs(Date.now()).add(3, 'hour').toDate()}));
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