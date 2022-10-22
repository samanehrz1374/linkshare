import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IcommentLike } from '../models/commentLike.model';

@Injectable({
  providedIn: 'root'
})
export class CommentlikeService {

  constructor(private http:HttpClient ) { }

  registerCommentLike(commentLike:IcommentLike):Observable<IcommentLike>{
    return this.http.post<IcommentLike>(`${environment.api}/CommentLike`,commentLike)

  }
}
