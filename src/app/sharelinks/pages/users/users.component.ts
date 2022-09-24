import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PostApiService } from '../../http/post-api.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { disableDebugTools } from '@angular/platform-browser';




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
  formGroup:any;
  showPostAddDiv:boolean=false;
  showSuccessMessage:boolean=false;
  all_tags:string[]=[];
 

  constructor(private postsApi:PostApiService,private http:HttpClient,private route:ActivatedRoute,private router:Router) { }

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


    this.formGroup = new FormGroup({
      'username': new FormControl( `${this.username}`, [ Validators.required ]),
      'userImages': new FormControl( `${this.user_posts.userImages}`, [ Validators.required ]),
      'link': new FormControl('', [ Validators.required ]),
      'caption': new FormControl('', [  ]),
      'discription': new FormControl('', [  ]),
      'tags': new FormControl([], [ ]),
      'image':new FormControl([''], [  ]),
      
  
    });
  
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
      caption:`${data.caption}`,
      discription:`${data.discription}`,
      image:`${data.image}`,
      tags:this.all_tags,
      vote:0,
      sharedDate:new Date(),
      comments:0,
      shared:0,
      userImages:`${this.user_posts.userImages}`
      
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
  //     "userImages":"http://localhost:4200/assets/images/user_images/user4.jpg",
  //     "comments":70,
  //     "shared":5,

  // }

    this.posts.push(newpost)

    console.log(this.posts)
    // this.user.email=email;
    // this.router.navigate([''])
    // this.modalService.dismissAll('Dismissed after saving data');
  }

  showAddPost(){
    this.showPostAddDiv=!this.showPostAddDiv
  }

  addedPostMessage(){
    this.showSuccessMessage=!this.showSuccessMessage;
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.showSuccessMessage = false;
      this.showPostAddDiv=false;
    }, 2000);

    

  }

  addTag(tag:string){
    console.log('sss')
    if(tag){

      this.all_tags.push(tag)
      
      this.formGroup.get('tags').reset();
    
    }
  }

  onRemoveTag(i:number){
    this.all_tags.splice(0,i+1);
  
  }


}
