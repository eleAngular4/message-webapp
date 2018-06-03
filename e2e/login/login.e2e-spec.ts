import { LoginPage } from './login.po';
import { MessagesPage } from '../messages/messages.po';

fdescribe('Protractor test - Login loginPage', () => {
  let loginPage: LoginPage;
  let messagesPage: messagesPage;

  const wrongCredentias = {
    username: 'wrongusername',
    password: 'wrongpassword'
  };

  beforeEach(() => {
    loginPage = new LoginPage();
    messagesPage = new MessagesPage();
    loginPage.createUser();
  });

  afterEach(() => {
    loginPage.deleteUser();
  });
  
  it('when user trying to login with wrong credentials he should stay on “login” loginPage and see error notification', () => {
    loginPage.navigateTo();
    expect(loginPage.getPageTitleText()).toEqual('Login');
    loginPage.fillCredentials(wrongCredentias);
    loginPage.clickAuthentication();
    expect(loginPage.getErrorMessage()).not.toBeNull();
  });

  it('when login is successful, user should redirect to messages page', () => {
    loginPage.navigateTo();
    loginPage.fillCredentials();
    loginPage.clickAuthentication();
    expect(messagesPage.getPageTitleText()).toEqual('Messages');
  });

});
