import { Component, OnInit } from '@angular/core';
import { PostApiService } from '../../http/post-api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts:any;


  constructor(private postsApi:PostApiService) { }

  ngOnInit(): void {

    this.posts=this.postsApi.getposts().subscribe(result => 
      {this.posts=result
        console.log(this.posts)
      });
  }

}
