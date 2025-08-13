import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CreateUser, UpdateUser} from "../interfaces/user";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  base = 'http://127.0.0.1:8000/api/user'

  constructor(private http: HttpClient, private readonly authService: AuthService) {
  }

  all() {
    return this.http.get(this.base)
  }

  byId(id: string) {
    return this.http.get(this.base + '/' + id)
  }

  create(user: CreateUser) {
    return this.http.post(this.base, user)
  }

  delete(id: string) {
    return this.http.delete(this.base + '/' + id)
  }

  update(user: UpdateUser) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.put(this.base + '/' + user.id, user, { headers })
  }

}
