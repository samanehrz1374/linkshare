import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostApiService } from '../../http/post-api.service';
import { Posts } from '../../models/posts.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username:any[];
  posts:any|(string | number)[];

  constructor(private postsApi:PostApiService,private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get(environment.url).subscribe((result:any=[])=>{
      this.posts=result;

      const indexes = [];
      for (let index = 0; index < this.posts.length; index++) {
      
        indexes.push(this.posts[index].userName);
    
      }
      this.username=indexes;
  })

  }

}
