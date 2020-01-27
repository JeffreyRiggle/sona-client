import loginService from '../../services/loginService';
import routing from '../../services/routing';
import './auth.less';

export class Auth {
    constructor() {
        this.email = '';
        this.password = '';
        this.error = '';
    }

    login() {
        loginService.login(this.email, this.password).then(() => {
            this.error = '';
            routing.navigate('home');
        }).catch(err => {
            if (err.status > 399 && err.status < 500) {
                this.error = 'Invalid Email or Password';
            } else {
                this.error = 'Server Error, try again later.';
            }
        });
    }
}