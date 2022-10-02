import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { PostApiService } from '../../http/post-api.service';
import { Posts } from '../../models/posts.model';
import { environment } from 'src/environments/environment';
// import {data} from '../../../../assets/data/posts.json';
import { DateAsAgoPipe } from 'src/app/shared/pipes/date-as-ago.pipe';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';




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
  @Input() logged_in_username:string;
  liked:boolean[]=[];
  commentliked:boolean[]=[];
  isMore:boolean[]=[];
  editing:boolean[]=[];
  all_tags:string[]=[]
  didnMatchSearchValue:boolean=false;
  editFormGroup:any;
  selected_post_image:string;
  isCommentShow:boolean=false;
  post_comments:any[];
  editmode:boolean=true;

  
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
    
      for (let index = 0; index < this.posts.length; index++) {
      
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

  
  onDeletePost(post_id:number){

    this.posts.splice(post_id,1);
    console.log(this.posts)

  }


  onMoreClicked(post_id:number){

    this.isMore[post_id+1]=!this.isMore[post_id+1]
    console.log(this.isMore)
          
  }


  onEditPostClicked(post_id:number){
    this.editmode=false;
    this.editing[post_id+1]=!this.editing[post_id+1]
    // console.log(post)

   
    this.all_tags=this.posts[post_id].tags
    console.log(this.all_tags)

    this.editFormGroup = new FormGroup({
      // 'username': new FormControl( `${this.posts[post_id].userName}`, [ Validators.required ]),
      // 'userProfile': new FormControl( `${this.user_posts.userProfile}`, [ Validators.required ]),
      'link': new FormControl(`${this.posts[post_id].link}`, [ Validators.required ]),
      'title': new FormControl('', [ ]),
      'caption': new FormControl(`${this.posts[post_id].caption}`, [  ]),
      'discription': new FormControl(`${this.posts[post_id].discription}`, [  ]),
      
  
    });
    this.selected_post_image=`${this.posts[post_id].image}`


    this.editFormGroup.controls['link'].disable();
    this.editFormGroup.controls['discription'].disable();
    this.editFormGroup.controls['title'].disable();


  }
  onClickSubmit(data:any,post_id:number){

    this.posts[post_id].caption=data.caption
    this.posts[post_id].discription=data.discription
    this.posts[post_id].link=data.link
    this.posts[post_id].tags=this.all_tags
    console.log(data.tags)

    this.editing[post_id+1]=!this.editing[post_id+1]
    this.editmode=true;



  }

  onRemoveTag(i:number){
    this.all_tags.splice(i,1);
  
  }

  onSubmit(post_id:number,form:NgForm){

    const comment={
      "username":String,
      "comment":String
      
    }
    for (let index = 0; index < this.posts.length; index++) {
      
      //   indexes.push(this.posts[index].userName);
        // console.log(this.posts[index].tags);
        if(this.posts[index].id===post_id){
          this.posts[index].comments.push(comment)

        }
    }

  }

  showComments(post_comments:any[]){
    this.isCommentShow=!this.isCommentShow

    this.post_comments=post_comments;
  }


  onCommentDissLiked(commentindex:number,post_comments:any,commentId:number){

    for(let i=0; i< this.post_comments.length; i++){
      if(post_comments[i].commentId === commentId){
        post_comments[i].likes
        post_comments[i].likes=this.post_comments[i].likes-1
        break

      }
    }
    this.commentliked[commentindex]=!this.commentliked[commentindex];



    

 
    

    // for (let index = 0; index < this.posts.length; index++) {
      
    //   if(this.posts[index].id===post_id){

  //       this.posts[index].comments[commentId]=this.posts[index].vote+1

  //     }
  //    }
    
  // this.commentliked[post_id]=!this.commentliked[post_id]

  }

  onCommentLiked(commentindex:number,post_comments:any,commentId:number){
    
    for(let i=0; i< this.post_comments.length; i++){
      if(post_comments[i].commentId === commentId){
        post_comments[i].likes
        post_comments[i].likes=this.post_comments[i].likes+1
        break
        
      }
    }
    this.commentliked[commentindex]=!this.commentliked[commentindex];
    console.log(this.commentliked)

  }

  onDeleteCommentClicked(commentindex:number){
    this.post_comments.splice(commentindex,1);
    console.log(this.post_comments)


  }


  


 
}
