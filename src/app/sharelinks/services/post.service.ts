import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddPost, IPosts } from '../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
 

  getAllPost():Observable<IPosts[]>{
    return this.http.get<IPosts[]>(environment.api+"/Post")
  }

  getUserAllPost(username:string):Observable<IPosts[]>{
    return this.http.get<IPosts[]>(environment.api+"/Post/userAllpost"+`/${username}`)
  }

  getPostById(postId:number):Observable<IPosts>{
    return this.http.get<IPosts>(environment.api+"/Post"+`/${postId}`)
  }

  deletePost(id:number):Observable<IPosts>{
    return this.http.delete<IPosts>(environment.api+"/Post"+`/${id}`)
  }

  getPostByFilter(filter:string):Observable<IPosts[]>{
    return this.http.get<IPosts[]>(environment.api+"/Post/filter"+`/${filter}`)
  }

  registerPost(post:IAddPost):Observable<IAddPost>{
    return this.http.post<IAddPost>(environment.api+"/Post",post)
  }


  getAllPostByTag(tag:string):Observable<IPosts[]>{
    return this.http.get<IPosts[]>(environment.api+"/Post/search"+`/${tag}`)
  }
  
}
