import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {of} from 'rxjs/observable/of';

@Injectable()
export class UserService {

  readonly API_REGISTER: string = `${environment.BACKEND_ADDRESS}/api/user`;

  constructor(private httpClient: HttpClient) {}

  register(user: User, confirmPassword: string): Observable<any> {
    let error = '';
    if (user.password !== confirmPassword) {
      error = 'Password and confirm password must be identic';
      return Observable.throw(error);
    }
    return this.httpClient.post(this.API_REGISTER, user);
  }
}
