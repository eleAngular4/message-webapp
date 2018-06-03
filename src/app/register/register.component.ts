import { User } from '../models/user';
import { Role } from '../enums/role';
import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.initForm();
    this.error = '';
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  register() {
    const name = this.registerForm.get('name').value;
    const firstName = this.registerForm.get('firstName').value;
    const login = this.registerForm.get('login').value;
    const password = this.registerForm.get('password').value;
    const confirmPassword = this.registerForm.get('confirmPassword').value;
    const user = new User(name, firstName, login, password, Role.USERS);
    this.userService.register(user, confirmPassword)
      .subscribe(
        () => this.router.navigate(['/']),
        (err) => { this.error = err; }
      );
  }

}
