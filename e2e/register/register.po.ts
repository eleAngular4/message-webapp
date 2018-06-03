import {browser, by, element} from 'protractor';
import axios from 'axios';
import {AxiosInstance} from "axios";
import {UserReq} from '../requests/user.req';

export class RegisterPage {

  navigateTo() {
    return browser.get('/register');
  }

  async createUser(user: any) {
    await UserReq.create(user);
  }

  async deleteUser(login: any) {
    await UserReq.delete(login);
  }

  fillUser(user: any) {
    element(by.css('[name="name"]')).sendKeys(user.name);
    element(by.css('[name="firstName"]')).sendKeys(user.firstName);
    element(by.css('[name="login"]')).sendKeys(user.login);
    element(by.css('[name="password"]')).sendKeys(user.password);
    element(by.css('[name="confirmPassword"]')).sendKeys(user.confirmPassword);
  }

  clickRegister() {
    element(by.css('.btn-success')).click();
  }

  getPageTitleText() {
    return element(by.css('app-root h2')).getText();
  }

  getErrorMessage() {
    return element(by.css('.alert-danger')).getText();
  }
}

