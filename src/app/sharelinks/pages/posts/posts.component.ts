import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { PostApiService } from '../../http/post-api.service';
import { Posts } from '../../models/posts.model';
import { environment } from 'src/environments/environment';
// import {data} from '../../../../assets/data/posts.json';
import { DateAsAgoPipe } from 'src/app/shared/pipes/date-as-ago.pipe';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts:any;
  constructor(private postsApi:PostApiService,private http:HttpClient) { }

  ngOnInit(): void {

    this.http.get(environment.url).subscribe(result => 
      {this.posts=result 

      });
  }

}
