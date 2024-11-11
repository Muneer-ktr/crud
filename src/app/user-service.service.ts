import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User  {
  id?:number
  name:string
  email: string
  place : string
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

private apiurl = "http://localhost:3000/users"

constructor(private http:HttpClient){}

// get all users

getUsers():Observable<User[]>{
  return this.http.get<User[]>(this.apiurl)
}

// get a user

getUser(id:number):Observable<User>{
  return this.http.get<User>(`${this.apiurl}/${id}`)
}

// add a user

adduser(user:User):Observable<User>{
  return this.http.post<User>(this.apiurl,user)
}
edituser(user:User):Observable<User>{
  return this.http.put<User>(`${this.apiurl}/${user.id}`,user)
}
deletuser(id:number):Observable<void>{
  return this.http.delete<void>(`${this.apiurl}/${id}`)
}
}
