export class User {
  name: string;
  firstName: string;
  login: string;
  password: string;
  role: string;
  fonctions: Array<string>;

  constructor(name: string, firstName: string, login: string, password: string,
    role: string, fonctions?: Array<string>) {
    this.name = name;
    this.firstName = firstName;
    this.login = login;
    this.password = password;
    this.role = role;
    this.fonctions = fonctions;
  }

}
