import {browser, by, element} from 'protractor';

export class MessagesPage {

  navigateTo() {
    return browser.get('/messages');
  }

  getPageTitleText() {
    return element(by.css('app-root h2')).getText();
  }

}
