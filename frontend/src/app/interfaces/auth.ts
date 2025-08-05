import {User} from "./user";

export interface Auth {
}

export interface Login{
  email: string,
  password: string,
  device_name: "postman" | 'other'
}
export interface Token{
  token:string,
  user: User
}
