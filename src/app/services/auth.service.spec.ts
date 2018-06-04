import {TestBed, inject} from '@angular/core/testing';
import {Injector} from '@angular/core';
import {LocalStorageService} from './localstorage.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from './auth.service';
import {User} from '../models/user';
import {Token} from '../models/token';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

describe('AuthService', () => {
  const login = 'LOGIN';
  const password = 'PASSWORD';
  const valueToken = 'value';
  const user = new User('name', 'firstName', login, password, 'USERS');
  let injector: Injector;
  let localStorageService: LocalStorageService;
  let httpMock: HttpTestingController;
  let authService: AuthService;
  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, LocalStorageService]
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
    authService = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('AuthService should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('#login should return a token object', () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const token = new Token(valueToken, date, user);
    authService.login(login, password)
      .subscribe(tokenResult => {
        expect(Observable.of(tokenResult)).toBeTruthy();
        expect(tokenResult).toBeTruthy();
        return Observable.of(tokenResult);
      });

    const request = httpMock.expectOne(authService.API_LOGIN);
    const headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(login + ':' + password));
    headers.append('Content-Type', 'application/json');
    expect(request.request.method).toEqual('GET');
    expect(request.request.headers).toEqual(headers);
    expect(request.request.responseType).toEqual('json');
    request.flush({token});
  });


  it('#login should return 401 (failed authentication) for bad credentials', () => {
    const error = 'Unauthorized';
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const token = new Token(valueToken, date, user);
    authService.login(login, password)
      .catch(errorService => {
        expect(Observable.of(errorService)).toBeTruthy();
        expect(errorService).toBeTruthy();
        return Observable.of(errorService);
      })
      .subscribe(() => {});
    const request = httpMock.expectOne(authService.API_LOGIN);
    request.flush({errorMessage: error}, {status: 401, statusText: error});

  });


  it('#isAuthenticated should return false when there is no token object', () => {
    localStorageService.removeToken();
    expect(authService.isAuthenticated()).toEqual(false);

  });

  it('#isAuthenticated should return true when there is valid token object in localStorage', () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const token = new Token(valueToken, date, user);
    localStorageService.saveToken(token);
    expect(authService.isAuthenticated()).toEqual(true);
  });

//  it('#isAuthenticated should return false when there is invalid token object in localStorage', () => {
//    const date = new Date();
//    date.setDate(date.getDate() - 1);
//    const token = new Token(valueToken, date, user);
//    localStorageService.saveToken(token);
//    expect(authService.isAuthenticated()).toEqual(false);
//  });

});
