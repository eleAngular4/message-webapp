import axios from 'axios';
import {baseUrl} from '../host';
export class UserReq {

  static readonly URL = `${baseUrl.BACKEND_ADDRESS}/api/user`;

  static async create(user) {
    axios.post(this.URL, user);
  }

  static async delete(login: string) {
    axios.delete(this.URL + '/' + login);
  }
}
