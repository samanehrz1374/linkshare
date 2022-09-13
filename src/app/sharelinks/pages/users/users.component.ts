import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostApiService } from '../../http/post-api.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { isArray } from 'jquery';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user_posts:any|(string | number)[];
  posts:any|(string | number)[];
  id = '';

  constructor(private postsApi:PostApiService,private http:HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {

    // this.http.get(environment.url).subscribe(result => 
    //   {this.posts=result 

    //   });

    this.id = this.route.snapshot.params['userName'];
    console.log(this.id)


    this.http.get(environment.url).subscribe((result:any=[])=>{
      this.posts=result;

          
    // const indexes = [];

    // for (let index = 0; index < this.posts.length; index++) {
    //   if (this.posts[index].userName === this.id) {
    //     indexes.push(index);
    //   }
    // }
    // for (let i=0; i<indexes.length; i++){

    //   if(i > -1){
    //     this.user_posts.push(this.posts[indexes[i]]);
    //   }
    // }
    // console.log(this.user_posts)
      // console.log(Array.isArray(this.posts))
      
      let index = this.posts.findIndex((posts:{userName:string;})=> posts.userName == this.id);
     
      if(index > -1){
        this.user_posts = this.posts[index];
      }
      // console.log(this.user_posts)
      
    });
    // this.route.params.subscribe(
    //   params => {
    //     const id= params['userName'];
    //     this.posts= this.contentfullService.getEntryById(id);
        
    //   }
    // )
    
  }

}
