import {LocalStorageService} from '../services/localstorage.service';
import {HttpEvent, HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getToken();
    if (token) {
      request = request.clone({setHeaders: {Authorization: `Bearer ${token.value}`}});
    }
    return next.handle(request);
  }

}
