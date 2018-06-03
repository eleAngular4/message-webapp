import { LocalStorageService } from './localstorage.service';
import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private localStorageService: LocalStorageService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.localStorageService.getToken()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }


}
