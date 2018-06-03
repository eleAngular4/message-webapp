import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Token} from '../models/token';
import {LocalStorageService} from '../services/localstorage.service';
import {environment} from '../../environments/environment';
import {RequestOptionsArgs, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {

  readonly API_LOGIN: string = environment.BACKEND_ADDRESS + '/api/login';

  constructor(private httpClient: HttpClient,
    private localStorageService: LocalStorageService) {}

  /**
   * Connection à l'API et récupération d'un token.
   */
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get(this.API_LOGIN, {headers: headers});
  }

  /**
   * Vérifier si l'utilisateur est connecté.
   */
  isAuthenticated(): boolean {
    const token: Token = this.localStorageService.getToken();
    if (token) {
      const current: Date = new Date();
      if (current > token.dateExpiration) {
        this.logout();
        return false;
      } else {
        return true;
      }
    }
    return false;
  }


  /**
   * Supprimer le token
   */
  logout(): void {
    this.localStorageService.removeToken();
  }

  /**
   * Enregistrer le tokens dans le localStorage
   */
  private saveToken(res): Token {
    const token = new Token(res.value, res.dateExpiration, res.userDTO);
    this.localStorageService.saveToken(token);
    return token;
  }

}
