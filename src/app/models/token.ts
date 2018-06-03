import {User} from '../models/user';

export class Token {
  value: string;
  dateExpiration: Date;
  user: User;

  constructor(value: string, dateExpiration: Date, user: User) {
    this.value = value;
    this.dateExpiration = dateExpiration;
    this.user = user;
  }

}
