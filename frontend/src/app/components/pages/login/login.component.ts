import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Login} from "../../../interfaces/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup

  constructor(private readonly authService: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  login() {
    const login: Login = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      device_name: "postman"
    }
    this.authService.login(login)
  }
}
