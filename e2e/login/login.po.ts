import {browser, by, element} from 'protractor';
import {UserReq} from '../requests/user.req';

export class LoginPage {

  readonly UNSERNAME: 'admin';
  readonly PASSWORD: 'admin';
  
  const user = {
    name: 'admin',
    firstName: 'admin',
    login: 'admin',
    password: 'admin',
    confirmPassword: 'admin',
    role: 'USERS'
  };

  private credentials = {
    username: 'admin',
    password: 'admin'
  };

  async createUser() {
    await UserReq.create(user);
  }

  async deleteUser() {
    await UserReq.delete(user.login);
  }

  navigateTo() {
    return browser.get('/login');
  }

  fillCredentials(credentials: any = this.credentials) {
    element(by.css('[name="username"]')).sendKeys(credentials.username);
    element(by.css('[name="password"]')).sendKeys(credentials.password);
  }

  clickAuthentication() {
    element(by.css('.btn-success')).click();
  }

  getPageTitleText() {
    return element(by.css('app-root h2')).getText();
  }

  getErrorMessage() {
    return element(by.css('.alert-danger')).getText();
  }
}
