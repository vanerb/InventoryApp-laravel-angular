import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Login} from "../../../interfaces/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private readonly authService: AuthService) {
  }


  login() {
    const login: Login = {
      email: "juan@example.com",
      password: "password",
      device_name: "postman"
    }
    this.authService.login(login)
  }
}
