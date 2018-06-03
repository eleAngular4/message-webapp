import {RegisterPage} from './register.po';
import {LoginPage} from '../login/login.po';

describe('Protractor test - Register Page', () => {
  let loginPage: LoginPage;
  let registerPage: RegisterPage;

  const existUser = {
    name: 'admin',
    firstName: 'admin',
    login: 'admin',
    password: 'admin',
    confirmPassword: 'admin',
    role: 'USERS'
  };

  const user = {
    name: 'user_test',
    firstName: 'user_test',
    login: 'user_test',
    password: 'user_test',
    confirmPassword: 'user_test',
    role: 'USERS'
  };


  beforeEach(() => {
    loginPage = new LoginPage();
    registerPage = new RegisterPage();
  });

  afterEach(async() => {
    await registerPage.deleteUser(existUser.login);
    await registerPage.deleteUser(user.login);
  });

  it('when trying to register existing user, he should stay on “register” Page and get error notification', () => {
    registerPage.createUser(existUser);
    registerPage.navigateTo();
    expect(registerPage.getPageTitleText()).toEqual('Register');
    registerPage.fillUser(existUser);
    registerPage.clickRegister();
    expect(registerPage.getErrorMessage()).not.toBeNull();
  });

  it('when user register is successful, user should redirect to index-login page', () => {
    registerPage.navigateTo();
    expect(registerPage.getPageTitleText()).toEqual('Register');
    registerPage.fillUser(user);
    registerPage.clickRegister();
    expect(loginPage.getPageTitleText()).toEqual('Login');
  });

});
