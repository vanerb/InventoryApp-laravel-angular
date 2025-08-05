import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateUser, UpdateUser} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  base = 'http://127.0.0.1:8000/api/user'

  constructor(private http: HttpClient) {
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
    return this.http.put(this.base + '/' + user.id, user)
  }

}
