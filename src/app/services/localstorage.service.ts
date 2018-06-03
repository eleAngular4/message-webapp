import {Injectable} from '@angular/core';
import {Token} from '../models/token';
import {User} from '../models/user';

@Injectable()
export class LocalStorageService {

  readonly TOKEN: string = 'TOKEN';

  constructor() {}

  /**
   * Enregistrer un token
   */
  saveToken(token: Token) {
    localStorage.setItem(this.TOKEN, JSON.stringify(token));
  }

  /**
   * Acceder au token
   */
  getToken(): Token {
    if (localStorage.getItem(this.TOKEN)) {
      const token: Token = JSON.parse(localStorage.getItem(this.TOKEN));
      return token;
    }
    return null;
  }

  /**
   * Supprimer le token
   */
  removeToken(): void {
    localStorage.removeItem(this.TOKEN);
  }

}
