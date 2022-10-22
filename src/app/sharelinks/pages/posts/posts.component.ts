import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { PostApiService } from '../../http/post-api.service';
// import { Posts } from '../../models/posts.model';
import { environment } from 'src/environments/environment';
// import {data} from '../../../../assets/data/posts.json';
import { DateAsAgoPipe } from 'src/app/shared/pipes/date-as-ago.pipe';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LikeService } from '../../services/like.service';
import { CommentlikeService } from '../../services/commentlike.service';
import { PostService } from '../../services/post.service';
import { CommentsService } from '../../services/comments.service';




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
  @Input() logged_in_username:any;
  @Output() like:EventEmitter<any>=new EventEmitter();


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
  modalRef: BsModalRef;
  profileImage:"../../../assets/images/profile.jpg"
  
  
  constructor(private postsApi:PostApiService,private http:HttpClient,private modalService: BsModalService,private likeservice:LikeService,private commentlikeservice:CommentlikeService,private postservice:PostService, private commentservice:CommentsService) { }

  ngOnInit(): void {
    
  
  }



 ngOnChanges(changes:any) {


  if (this.typeOfEvent && changes.typeOfEvent){
 
    if(changes.typeOfEvent.currentValue==='newest'){
      this.posts=this.posts.sort((a:any, b:any) => {return  (new Date(b.sharedDate)).getTime() -(new Date(a.sharedDate)).getTime();});
      // console.log(this.posts.sort((a:any, b:any) => parseInt(a.id) - parseInt(b.id))) 
    
   
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
    // console.log(post_id)
    let date= new Date();
    console.log(date)
    let date1=date.getFullYear().toString()+(date.getMonth()+1).toString()+date.getUTCDate().toString();
    let time1 = this.customHour(date.getHours()).toString()+this.customHour(date.getMinutes()).toString()+this.customHour(date.getSeconds()).toString();
    var like={
      date: parseInt(date1),
      time:parseInt(time1),
      postId:post_id,
      userName:"Samaneh",//////////////////////////////////////////////////loggedin username
      isActive:true,
      
    }

    this.likeservice.registerLike(like).subscribe();
    this.like.emit(post_id)
    // console.log(this.posts)


    this.liked[post_id]=!this.liked[post_id]
    
  }

 


  
  onDeletePost(postid:number){
    this.postservice.deletePost(postid).subscribe();

    this.postservice.getAllPost().subscribe((result)=>{
     this.posts=result;
    })
    
  }


  onMoreClicked(post_id:number){

    this.isMore[post_id+1]=!this.isMore[post_id+1]
    // console.log(this.isMore)
          
  }


  onEditPostClicked(post_id:number){
    this.editmode=false;
    this.editing[post_id+1]=!this.editing[post_id+1]
    // console.log(post)

   
    this.all_tags=this.posts[post_id].tags
    // console.log(this.all_tags)

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
    // console.log(data.tags)

    this.editing[post_id+1]=!this.editing[post_id+1]
    this.editmode=true;



  }

  onRemoveTag(i:number){
    this.all_tags.splice(i,1);
  
  }

  onSubmit(postId:number,form:NgForm,logged_in_username:any){

    console.log(postId)

    let date= new Date();
  
    let date1=date.getFullYear().toString()+(date.getMonth()+1).toString()+date.getUTCDate().toString();
    let time1 = this.customHour(date.getHours()).toString()+this.customHour(date.getMinutes()).toString()+this.customHour(date.getSeconds()).toString();
    // console.log(time1)

    const comment={
      userName:'Samaneh',/////////////////////////////////logged_in_userName
      comment:form.value.comment,
      date: parseInt(date1),
      time:parseInt(time1),
      isActive:true,
      postId:postId
    }

    this.commentservice.registerComment(comment).subscribe();

    this.postservice.getPostById(postId).subscribe((result)=>{
     
      for (let i=0;i<this.posts.length;i++){
        this.posts[i]=result;
      }

    })

    form.reset();
   

  }

  showComments(post_comments:any[],template: TemplateRef<any>){
    this.isCommentShow=!this.isCommentShow
    
    this.post_comments=post_comments;
    // console.log(post_comments)
    this.modalRef = this.modalService.show(template);
  }



  onCommentLiked(postId:number,commentId:number){

    let date= new Date();
  
    let date1=date.getFullYear().toString()+(date.getMonth()+1).toString()+date.getUTCDate().toString();
    let time1 = this.customHour(date.getHours()).toString()+this.customHour(date.getMinutes()).toString()+this.customHour(date.getSeconds()).toString();
    // console.log(time1)s
    var commentlike={
      date: parseInt(date1),
      time:parseInt(time1),
      commentId:commentId,
      userName:"Samaneh",//////////////////////////////////////////////////loggedin username
      isActive:true,
      
    }

    this.commentlikeservice.registerCommentLike(commentlike).subscribe();


    this.postservice.getPostById(postId).subscribe((result)=>{
     
      for (let i=0;i<this.posts.length;i++){
        this.posts[i]=result;
    
        this.post_comments=this.posts[i].comments;
      }

    })

  }

  onDeleteCommentClicked(postId:number,commentId:number){
    // console.log(postId,commentId)

    this.commentservice.deletecomment(commentId).subscribe();


    this.postservice.getPostById(postId).subscribe((result)=>{
     
      for (let i=0;i<this.posts.length;i++){
        this.posts[i]=result;
    
        this.post_comments=this.posts[i].comments;
      }

    })

    // this.post_comments.splice(commentindex,1);
    // console.log(this.post_comments)
    // this.commentservice.deletecomment()



  }

  customHour(hms:any){

    if (hms   < 10) {hms   = "0"+hms;}
  
   
    return hms;

  }


  


 
}
