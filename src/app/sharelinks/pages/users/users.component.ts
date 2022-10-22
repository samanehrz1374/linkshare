import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { PostApiService } from '../../http/post-api.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { disableDebugTools } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WheatherService } from '../../services/wheather.service';
import { IWeather } from '../../models/weather.model';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/users.model';
import { IPosts } from '../../models/posts.model';





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 
  username:any[];
  user_posts:any='';
  User:IUser;
  user_all_posts:any[]=[];
  likes:number=0;
  posts:IPosts[];
  id = '';
  typeOfEvent:string='';
  searchValue:string;
  all_voted:number;
  posts_count:number=0;
  postaddForm:FormGroup;
  showPostAddDiv:boolean=false;
  showSuccessMessage:boolean=false;
  all_tags:string[]=[];
  logged_in_username={
    userName:"",
    userProfile:"",
    firstName:"",
    lastName:"",
    password:"",
    email:""
    
  };
  logged_in_username_user:any;

  isProfileHover:boolean=false;
  preview:{
    url:string,
    title:string,
    description:string,
    image:string
  }={
    url:"",
    title:"",
    description:"",
    image:environment.link_image

  }

  dis:boolean=true;
  modalRef: BsModalRef;

  result:IWeather[];

  
  


  
 

  constructor(private postsApi:PostApiService,private http:HttpClient,private route:ActivatedRoute,private router:Router,private fb: FormBuilder,private modalService: BsModalService,private wheatherService:WheatherService,private postservice:PostService,private userservice:UserService) {
    // this.myForm();
   }

  // myForm() {
  //   this.postaddForm = this.fb.group({
  //     'username': new FormControl( `${this.username}`, [ Validators.required ]),
  //     'userProfile': new FormControl( `${this.user_posts.userProfile}`, [ Validators.required ]),
  //     'link': new FormControl('', [Validators.required]),
  //     'title': new FormControl('', [ Validators.required]),
  //     'caption': new FormControl('', [  ]),
  //     'discription': new FormControl('', [  ]),
  //     'tags': new FormControl([], [ ]),
  //     'image':new FormControl([''], [  Validators.required ]),
  //   });
  // }

  openModal(user_posts:{},template: TemplateRef<any>) {
   
    this.modalRef = this.modalService.show(template);
 }

  ngOnInit(): void {


    this.wheatherService.get_Weather().subscribe((result:IWeather[]) => {
      this.result=result
      console.log(this.result)
    }
    )
    



    
    this.http.get(environment.userUrl).subscribe((result:any=[])=>{
      this.logged_in_username=result[1];
      this.logged_in_username_user=this.logged_in_username.userName
    })
    
    

    this.route.params.subscribe((params)=>{
      this.id=params['userName']
  
     
  
      this.username=[this.id];
  
      // this.id = this.route.snapshot.params['userName'];
    
      
      this.postservice.getUserAllPost(this.id).subscribe((result:IPosts[])=>{
        this.posts = result
        console.log(this.posts)

        for(let i=0;i<this.posts.length; i++){
          this.likes +=this.posts[i].likes
        }

      })



      this.userservice.getUser(this.id).subscribe((result:IUser)=>{
        this.User = result;
        console.log(this.User)
      })

      
    
      // this.http.get(environment.url).subscribe((result:any=[])=>{
      //   this.posts=result;
      //   // console.log('update')
          
      //   // const indexes = [];
    
      //   // for (let index = 0; index < this.posts.length; index++) {
      //   //   if (this.posts[index].userName === this.id) {
      //   //     indexes.push(index);
            
      //   //   }
      //   // }
      //   // for (let i=0; i<indexes.length; i++){
      //   //     if(i > -1){
      //   //       this.user_posts=this.posts[indexes[i]];
      //   //       // console.log(this.user_posts)
      //   //       break
      //   //     }
      //   // }
    
    
      //   // for (let i=0; i<indexes.length; i++){
      //   //   if(i > -1){
      //   //     this.votes=this.posts[indexes[i]].vote +this.votes;
      //   //     // this.posts_count++;
            
      //   //   }
      //   // }
      
    
      //   // for (let i=0; i<indexes.length; i++){
      //   //   if(i > -1){
      //   //     this.user_all_posts.push(this.posts[indexes[i]]);
      //   //   }
      //   // }

    
        
      // })
    
    })


    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.postaddForm = new FormGroup({
      'username': new FormControl( `${this.username}`, [ Validators.required]),
      'userProfile': new FormControl( `${this.user_posts.userProfile}`, [ Validators.required ]),
      'link': new FormControl('', [Validators.required,Validators.pattern(urlRegex)]),
      'title': new FormControl('', [ Validators.required]),
      'caption': new FormControl('', [  ]),
      'discription': new FormControl('', [  ]),
      'tags': new FormControl([], [ ]),
      'image':new FormControl([''], [ Validators.required ]),
      
  
    });

    // this.postaddForm.controls['image'].disable();
    // this.postaddForm.controls['title'].disable();
    // this.postaddForm.controls['discription'].disable();

    



    
  
    // for (let i=0; i<indexes.length; i++){
    //   if(i > -1){
    //     this.user_posts.push(this.posts[indexes[i]]);
    //   }
    // }
    // console.log(this.user_posts)
   
      
    // });
   
    
  }

  // ngAfterViewInit() {
  //   $('#btnSave').click(function() {
  //     $('#StudentModal').modal('hide');
  //  });
  // }

 

  likeAllert(post_id:number){

    this.postservice.getPostById(post_id).subscribe((result)=>{
      for (let i=0;i<this.posts.length;i++){
        this.posts[i]=result;
        console.log(result)
        
      }

    })


  }

 

  allert(name:any){
    this.typeOfEvent=name;
  }

  search(searchValue:string){
    this.searchValue=searchValue;
  }

  onClickSubmit(data:any){


    const newpost={
      id:this.posts.length+1,
      userName:data.username,
      link:`${data.link}`,
      caption:`${data.caption || ""}`,
      discription:`${data.discription || ""}`,
      image:`${data.image||this.preview.image}`,
      title:`${data.title}`,
      tags:this.all_tags,
      vote:0,
      sharedDate:new Date(),
      comments:0,
      shared:0,
      userProfile:`${this.user_posts.userProfile}`
      
    }

  //   const dommypost={
  //     "id":2,
  //     "userName":"نسیم",
  //     "link":"https://jsonplaceholder.typicode.com/",
  //     "caption":"برای ساخت فایل json از لینک زیر میتونی کمک بگیری",
  //     "discription":"ساختار دستورات JSON زیر مجموعه ای از ساختار ایجاد شیء در جاوا اسکریپت (JavaScript) است، در این مقاله چگونگی ایجاد یک فایل JSON را با استفاده از کلاس JavaScriptSerializer توضیح می دهیم.",
  //     "image":"http://localhost:4200/assets/images/post_images/json_placeholder.png",
  //     "tags":["انگولار","ساختار", "فولدربندی", "طراحی", "سایت", "UI", "UX"],
  //     "vote":10,
  //     "sharedDate":"2015-02-01T09:28:56.321-10:00",
  //     "userProfile":"http://localhost:4200/assets/images/user_images/user4.jpg",
  //     "comments":70,
  //     "shared":5,

  // }

    ////////////////// this.posts.push(newpost)
    ////////////////// this.postaddForm.reset();

    
 
  }

  showAddPost(){
    this.showPostAddDiv=!this.showPostAddDiv
  }

  addedPostMessage(){
    
    this.showSuccessMessage=!this.showSuccessMessage;
    setTimeout(()=>{                       
      this.showSuccessMessage = false;
      this.showPostAddDiv=false;
    }, 2000);

    

  }

  addTag(tag:string){
   
    if(tag){

      this.all_tags.push(tag)
      
      this.postaddForm.controls['tags'].reset();
    
    }
  }

  onRemoveTag(i:number){
    this.all_tags.splice(i,1);
  }

  // onFileChanged(event: any): void {
    
  //   this.user_selected_image=event.target.value
  //   this.link_image=""
    
  //   // if (event.target.value && event.target.value[0]) {
  //   //     const file = event.target.value[0];

  //   //     const reader = new FileReader();
  //   //     reader.onload = e => this.link_image = reader.result;

  //   //     reader.readAsDataURL(file);
  //   //     // this.link_image=""
  //   // }
  // }

  onProfileHover(){
    this.isProfileHover=true
  }
  onprifileonHover(){
    this.isProfileHover=false
  }


  getLinkPreview(link: string): Observable<any> {
    const api = 'https://api.linkpreview.net/?key=8ddda351b2296f4a59306f76c3c671c3&q=' + link;
    return this.http.get(api);
  }
  
  onPreview(link:string) {
    this.getLinkPreview(link)
    .subscribe(coming_preview => {
      this.preview = coming_preview;
     
      // console.log(this.preview)

      if (!this.preview.title) {
        this.preview.title = this.preview.url;
      }

    },
    

     error => {
      this.preview.url = link;
      this.preview.title = this.preview.url;
    }
    );
  }

  print(){
    console.log('ss')
  }


  onSubmit(formdata:any,userName:string){

    for(let i=0;i<this.posts.length;i++){
      if (this.posts[i].userName===userName){
        // this.posts[i].userName=formdata.userName;
        this.posts[i].firstName=formdata.firstName;
        this.posts[i].lastName=formdata.lastName;

      }  
    }
  }

  





}
