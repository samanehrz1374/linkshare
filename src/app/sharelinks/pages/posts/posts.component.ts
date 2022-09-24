import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { PostApiService } from '../../http/post-api.service';
import { Posts } from '../../models/posts.model';
import { environment } from 'src/environments/environment';
// import {data} from '../../../../assets/data/posts.json';
import { DateAsAgoPipe } from 'src/app/shared/pipes/date-as-ago.pipe';
import { post } from 'jquery';




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
  liked:boolean[]=[];
  isMore:boolean[]=[];
  didnMatchSearchValue:boolean=false;


  
  constructor(private postsApi:PostApiService,private http:HttpClient) { }

  ngOnInit(): void {
    
  
  }

  

 ngOnChanges(changes:any) {
  if (this.typeOfEvent && changes.typeOfEvent){

    if(changes.typeOfEvent.currentValue==='newest'){
      this.posts=this.posts.sort((a:any, b:any) => {return  (new Date(b.sharedDate)).getTime() -(new Date(a.sharedDate)).getTime();});
      // console.log(this.posts.sort((a:any, b:any) => parseInt(a.id) - parseInt(b.id))) 
      console.log(this.posts)
   
    }else if(changes.typeOfEvent.currentValue==='oldest'){
      this.posts=this.posts.sort((a:any, b:any) => {return (new Date(a.sharedDate)).getTime() - (new Date(b.sharedDate)).getTime();});

     
  
  
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
              this.didnMatchSearchValue=false;

              indexes.push(this.posts[index]);
            }
            else{
              this.didnMatchSearchValue=true;
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


  onLiked(post_id:number){
   

    // console.log(this.posts)


    
      for (let index = 0; index < this.posts.length; index++) {
      
      //   indexes.push(this.posts[index].userName);
        // console.log(this.posts[index].tags);
        if(this.posts[index].id===post_id){
          this.posts[index].vote=this.posts[index].vote+1

          
        }
       }
      
    this.liked[post_id]=!this.liked[post_id]
    
  }

  onDissLiked(post_id:number){


    console.log(this.posts)

      for (let index = 0; index < this.posts.length; index++) {
      
      //   indexes.push(this.posts[index].userName);
        // console.log(this.posts[index].tags);
        if(this.posts[index].id===post_id){
          this.posts[index].vote=this.posts[index].vote-1
        }
       }
      
      this.liked[post_id]=!this.liked[post_id]
  
    
  }

  
  onDeletePost(i:number){



    console.log(i)
    this.posts.splice(i,1);
    console.log(this.posts)



  }


  onMoreClicked(post_id:number){

    this.isMore[post_id+1]=!this.isMore[post_id+1]
    console.log(this.isMore)
          
  }




 
}
