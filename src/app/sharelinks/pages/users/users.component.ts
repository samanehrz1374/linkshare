import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostApiService } from '../../http/post-api.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user_posts:any;
  posts:any;
  id = '';

  constructor(private postsApi:PostApiService,private http:HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {

    // this.http.get(environment.url).subscribe(result => 
    //   {this.posts=result 

    //   });

    this.id = this.route.snapshot.params['userName'];
    console.log(this.id)


    this.http.get(environment.url).subscribe((result)=>{
      this.posts=result;
      let index = this.posts.findIndex((posts:{userName:string;})=> posts.userName == this.id);
      console.log(index)
      if(index > -1){
        this.user_posts = this.posts[index];
      }
      console.log(this.user_posts)
      
    });
    // this.route.params.subscribe(
    //   params => {
    //     const id= params['userName'];
    //     this.posts= this.contentfullService.getEntryById(id);
        
    //   }
    // )
    
  }

}
