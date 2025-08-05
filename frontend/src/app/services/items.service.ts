import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CreateItem, Item, UpdateItem} from "../interfaces/item";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  base = 'http://127.0.0.1:8000/api/items'

  constructor(private http: HttpClient, private readonly authService: AuthService) {
  }


  all() {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get<Item[]>(this.base, { headers })
  }

  byId(id: string) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get(this.base + '/' + id, { headers })
  }

  create(item: FormData) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.post(this.base, item, { headers })
  }

  delete(id: string) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.delete(this.base + '/' + id, { headers })
  }

  update(item: UpdateItem) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.put(this.base + '/' + item.id, item, { headers })
  }
}
