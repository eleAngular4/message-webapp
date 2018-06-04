import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Injector} from '@angular/core';
import {LoginComponent} from './login.component';
import {AuthService} from '../services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {Token} from '../models/token';
import {of} from 'rxjs/observable/of';
import {Router} from '@angular/router';

class MockAuthService extends AuthService {

  constructor() {
    super(null, null);
  }

  savedToken: Token = null;
  user = new User('name', 'firstName', 'login', 'password', 'USERS');
  token = new Token('value', new Date(), this.user);

  public login(username: string, password: string): Observable<any> {
    if (username === this.user.name && password === this.user.password) {
      this.savedToken = this.token;
      return Observable.of(this.token);
    } else {
      return Observable.throw('Bad Credentials');
    }
  }
  public isAuthenticated(): boolean {
    return (this.savedToken && this.savedToken != null);
  }

}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [FormBuilder,
        {
          provide: AuthService,
          useClass: MockAuthService
        }
      ],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  afterEach(() => {
    authService = null;
    component = null;
  });


  it('LoginComponent should create', () => {
    expect(component).toBeTruthy();
  });

  it('Login form shold be invalid when it is empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('username field validity', () => {
    let errors = {};
    const username = component.loginForm.controls['username'];
    expect(username.valid).toBeFalsy();

    // username field is required
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set username to something
    username.setValue('test');
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    // password field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set password to something
    password.setValue('password');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });


  it('submit login form with valid credentials should return a token', async(() => {
    const response: Token;

    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue('login');
    component.loginForm.controls['password'].setValue('password');
    expect(component.loginForm.valid).toBeTruthy();
    spyOn(authService, 'login').and.returnValue(of(response));
    spyOn(router, 'navigate').and.returnValue(true);

    // Trigger the login function
    component.login();
    fixture.detectChanges();
    expect(authService.login).toHaveBeenCalled();

    // Check there is no error message on the component.
    expect(component.error).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['messages']);
  }));

  it('#login should return error message if login and password are invalid', async(() => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue('logindfbsdfbgdf');
    component.loginForm.controls['password'].setValue('password');
    expect(component.loginForm.valid).toBeTruthy();
    spyOn(authService, 'login').and.returnValue(of(response));
    // Trigger the login function
    component.login();
    fixture.detectChanges();
    expect(authService.login).toHaveBeenCalled();

    // Error. user is one the same page and router have not been called
    expect(router.navigate).not.toHaveBeenCalledWith(['messages']);

  }));
});
