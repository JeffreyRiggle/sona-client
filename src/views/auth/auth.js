import './auth.less';
import loginService from '../../services/loginService';
import routing from '../../services/routing';

export class Auth {
    login() {
        loginService.login().then(() => {
            routing.navigate('home');
        });
    }
}