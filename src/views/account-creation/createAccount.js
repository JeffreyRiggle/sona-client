import httpManager from '../../services/httpManager';
import routing from '../../services/routing';
import './createAccount.less';

const genders = [
    { display: 'Female', value: 'F' },
    { display: 'Male', value: 'M' },
    { display: 'Other', value: 'O' },
    { display: 'Withheld', value: 'W' }
];

export class CreateAccount {
    constructor() {
        this.userName = '';
        this.firstName = '';
        this.lastName = '';
        this.gender = '';
        this.emailAddress = '';
        this.password = '';
        this.error = false;
        this.genders = genders;
    }

    createAccount() {
        httpManager.post('/sona/v1/users', JSON.stringify({
            userName: this.userName,
            firstName: this.firstName,
            lastName: this.lastName,
            gender: this.gender,
            emailAddress: this.emailAddress,
            password: this.password
        }), [{ key: 'Content-Type', value: 'application/json' }]).then(() => {
            this.error = false;
            routing.navigate('login');
        }).catch(err => {
            console.log('failed to create user', err);
            this.error = true;
        });
    }
}