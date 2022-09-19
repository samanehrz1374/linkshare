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
  username:any[];
  profile_image:any;
  user_posts:any='';
  votes:number=0;
  posts:any|(string | number)[];
  id = '';
  typeOfEvent:string='';
  searchValue:string;
  all_voted:number;
  posts_count:number=0;

  constructor(private postsApi:PostApiService,private http:HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {

  

    this.id = this.route.snapshot.params['userName'];
    this.username=[this.id];
    console.log(this.id)
    


    this.http.get(environment.url).subscribe((result:any=[])=>{
      this.posts=result;
      

          
    const indexes = [];

    for (let index = 0; index < this.posts.length; index++) {
      if (this.posts[index].userName === this.id) {
        indexes.push(index);
      }
    }
    for (let i=0; i<indexes.length; i++){
        if(i > -1){
          this.user_posts=this.posts[indexes[i]];
          // console.log(this.user_posts)
          break
        }
      }

    for (let i=0; i<indexes.length; i++){
      if(i > -1){
        this.votes=this.posts[indexes[i]].vote +this.votes;
        this.posts_count++;
        
      }
    }
    console.log(this.votes)

      
    })
  
    // for (let i=0; i<indexes.length; i++){
    //   if(i > -1){
    //     this.user_posts.push(this.posts[indexes[i]]);
    //   }
    // }
    // console.log(this.user_posts)
   
      
    // });
   
    
  }

  allert(name:any){
    this.typeOfEvent=name;
  }

  search(searchValue:string){
    this.searchValue=searchValue;


  }

}
