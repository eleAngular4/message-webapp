import {TestBed, inject} from '@angular/core/testing';
import {UserService} from './user.service';
import {User} from '../models/user';
import {Injector} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Observable} from 'rxjs/Observable';

describe('UserService', () => {
  const name = 'name';
  const firstName = 'firstName';
  const login = 'login';
  const password = 'password';
  const confirmPassword = 'password';
  const role = 'USERS';
  let injector: Injector;
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    userService = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('UserService should be created', () => {
    expect(userService).toBeTruthy();
  });


  it('#register should register a new user', () => {
    const user = new User(name, firstName, login, password, role);
    userService.register(user, confirmPassword)
      .subscribe(() => {});
    const request = httpMock.expectOne(userService.API_REGISTER);
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(user);
    expect(request.cancelled).toBeFalsy();
    expect(request.request.responseType).toEqual('json');
    request.flush([]);
  });

  it('#register should throw error when passwords are different.', () => {
    userService.register(new User(name, firstName, login, password, role), 'password2')
      .catch(error => {
        expect(Observable.of(error)).toBeTruthy();
        expect(error).toBeTruthy();
        return Observable.of(error);
      })
      .subscribe(() => {});

  });

  it('#register should throw error when API return an error.', () => {
    const errorMessage = 'Bad Request - User already exist';
    userService.register(new User(name, firstName, login, password, role), confirmPassword)
      .catch(error => {
        expect(Observable.of(error)).toBeTruthy();
        expect(error).toBeTruthy();
        return Observable.of(errorMessage);
      })
      .subscribe(() => {});

    const request = httpMock.expectOne(userService.API_REGISTER);
    expect(request.request.method).toEqual('POST');
    request.flush({errorMessage: errorMessage}, {status: 400, statusText: errorMessage});
  });

});
