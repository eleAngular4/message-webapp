import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.initForm();
    this.error = null;
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['messages']);
    }
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    this.authService.login(username, password)
                    .subscribe(
                      () => this.router.navigate(['messages']),
                      (err) => { this.error = err; }
                    );
  }
}
