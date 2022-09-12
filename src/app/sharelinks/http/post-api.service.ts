import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Posts } from '../models/posts.model';


@Injectable({
  providedIn: 'root'
})
export class PostApiService {
  
  // results:Observable<Posts> ;

  constructor(private http:HttpClient) { }

  getposts():Observable<any>{

  return this.http.get(environment.url) 
  // return 

  }


}
