import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  typeOfEvent:string='';
  searchValue:string;
  logged_in_username:string='nasim'
  logged_in_firstName="نسیم";

  
  


  constructor(private postsApi:PostApiService,private http:HttpClient) { }

  ngOnInit(): void {

    this.http.get(environment.url).subscribe((result:any=[])=>{
          this.posts=result;
          console.log(this.posts)
    })
  //   this.http.get(environment.url).subscribe((result:any=[])=>{
  //     this.posts=result;

  //     const indexes = [];
  //     for (let index = 0; index < this.posts.length; index++) {
      
  //       indexes.push(this.posts[index].userName);
    
  //     }
  //     this.username=indexes;

  // })

  }


  allert(name:any){
    this.typeOfEvent=name;
  }

  search(searchValue:string){
    this.searchValue=searchValue;


  }

}
