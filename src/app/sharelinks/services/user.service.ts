import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(userName:string):Observable<IUser[]>{
    return this.http.get<IUser[]>(environment.api+"/User/User"+`/${userName}`)
  }
}
