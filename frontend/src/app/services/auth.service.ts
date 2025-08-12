import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login, Token} from "../interfaces/auth";
import {Router} from "@angular/router";
import {CreateUser} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base = 'http://127.0.0.1:8000/api'


  constructor(private http: HttpClient, private readonly router: Router) {
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  login(login: Login) {
    this.http.post<Token>(this.base + '/login', login).subscribe({
      next: async (token: Token) => {
        this.setToken(token.token);
        await this.router.navigate(['/']);
        window.location.reload()

      },
      error: (err) => {

      }
    });


  }

  register(user: CreateUser) {
    this.http.post<Token>(this.base + '/register', user).subscribe({
      next: async (token: Token) => {
        await this.router.navigate(['/']);
        window.location.reload()
      },
      error: (err) => {

      }
    });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
