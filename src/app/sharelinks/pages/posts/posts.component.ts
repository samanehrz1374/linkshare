import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class PostsComponent implements OnInit,OnChanges {
  @Input() username:any[];
  @Input() typeOfEvent:string='';
  @Input() searchValue:string;
  @Input() posts:any;
  
  constructor(private postsApi:PostApiService,private http:HttpClient) { }

  ngOnInit(): void {
    
    
   

  
  }
 ngOnChanges(changes:any) {
  if (this.typeOfEvent && changes.typeOfEvent){

    if(changes.typeOfEvent.currentValue==='newest'){
      this.posts=this.posts.sort((a:any, b:any) => {return  (new Date(b.shared_date)).getTime() -(new Date(a.shared_date)).getTime();});
      // console.log(this.posts.sort((a:any, b:any) => parseInt(a.id) - parseInt(b.id))) 
      console.log(this.posts)
   
    }else if(changes.typeOfEvent.currentValue==='oldest'){
      this.posts=this.posts.sort((a:any, b:any) => {return (new Date(a.shared_date)).getTime() - (new Date(b.shared_date)).getTime();});

     
  
  
    }else if(changes.typeOfEvent.currentValue==='mostliked'){
      this.posts=this.posts.sort((a:any, b:any) => {return  parseInt(b.vote) -parseInt(a.vote);});

  
  
    }else if(changes.typeOfEvent.currentValue==='leastliked'){
      this.posts=this.posts.sort((a:any, b:any) => {return parseInt(a.vote) - parseInt(b.vote);});

  
    }
  }

  if (this.searchValue && changes.searchValue){
    this.http.get(environment.url).subscribe((result:any=[])=>{
          this.posts=result;
    
          // console.log(this.posts)
          const indexes = [];
          for (let index = 0; index < this.posts.length; index++) {
          
          //   indexes.push(this.posts[index].userName);
            // console.log(this.posts[index].tags);
            if(this.posts[index].tags.includes(this.searchValue)){

              indexes.push(this.posts[index]);
            }
           }
          this.posts=indexes;
    
      })
  }
  }


  tag_search(tag:string){
    this.http.get(environment.url).subscribe((result:any=[])=>{
      this.posts=result;

      // console.log(this.posts)
      const indexes = [];
      for (let index = 0; index < this.posts.length; index++) {
      
      //   indexes.push(this.posts[index].userName);
        // console.log(this.posts[index].tags);
        if(this.posts[index].tags.includes(tag)){

          indexes.push(this.posts[index]);
        }
       }
      this.posts=indexes;

  })

  }




 
}
