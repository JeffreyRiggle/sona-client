import loginService from '../../services/loginService';
import routing from '../../services/routing';

export class Auth {
    constructor() {
        this.email = '';
        this.password = '';
    }

    login() {
        loginService.login(this.email, this.password).then(() => {
            routing.navigate('home');
        });
    }
}