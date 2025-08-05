export interface User {
  "id": number,
  "name": string,
  "email": string,
  "email_verified_at": string,
  "created_at": string,
  "updated_at": string
}

export interface CreateUser{
  "name": string,
  "email": string,
  "password": string,
  "password_confirmation": string
}

export interface UpdateUser{
  id: string,
  "name": string,
  "email": string,
  "password": string,
  "password_confirmation": string
}
