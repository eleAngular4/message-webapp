import {TestBed, inject} from '@angular/core/testing';
import {Injector} from '@angular/core';
import {LocalStorageService} from './localstorage.service';
import {User} from '../models/user';
import {Token} from '../models/token';

describe('LocalStorageService', () => {
  let injector: Injector;
  let localStorageService: LocalStorageService;
  const value = 'value';
  const dateExpiration = new Date();;
  const user = new User('name', 'firstName', 'login', 'password', 'USERS');

  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    // Add spyOn to when localStorage.getItem is called, program call mockLocalStorage with the same argument, and so one.
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    localStorageService = injector.get(LocalStorageService);
  });

  it('LocalStorageService should be created', () => {
    expect(localStorageService).toBeTruthy();
  });

  it('#saveToken should insert token into localStorage', () => {
    const token = new Token(value, dateExpiration, user);
    localStorageService.saveToken(token);
    expect(localStorage.getItem(localStorageService.TOKEN)).toEqual(JSON.stringify(token));
  });

  it('#removeToken should remove token', () => {
    localStorageService.removeToken();
    expect(localStorage.getItem(localStorageService.TOKEN)).toEqual(null);
  });

  it('#getToken should return a token', () => {
    const token = new Token(value, dateExpiration, user);
    localStorageService.saveToken(token);
    expect(localStorage.getItem(localStorageService.TOKEN)).toEqual(JSON.stringify(localStorageService.getToken()));
  });

});
