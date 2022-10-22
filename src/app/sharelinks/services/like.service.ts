import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILike } from '../models/like.model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http:HttpClient) { }

  registerLike(Like:ILike):Observable<ILike>{
    return this.http.post<ILike>(`${environment.api}/Like`,Like)
  }
}
