import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostApiService } from '../../http/post-api.service';
import { IPosts } from '../../models/posts.model';
import { PostService } from '../../services/post.service';
// import { Posts } from '../../models/posts.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username:(string|number)[];
  posts:IPosts[];
  typeOfEvent:string='';
  searchValue:string;
  // @Input() logged_in_username={
  //   userName:"",
  //   userProfile:"",
  //   firstName:"",
  //   lastName:"",
  //   password:"",
  //   email:""
    
  // };

  logged_in_username={
    userName:"",
    userProfile:"",
    firstName:"",
    lastName:"",
    password:"",
    email:""
    
  };
  active_profiles:any[];
  users:[];
  most_pupular_links:any[];
  all_posts:any[];
  @Input() login_clicked:boolean;
  modalRef: BsModalRef;
  

  

  
  


  constructor(private postsApi:PostApiService,private http:HttpClient,private modalService: BsModalService,private postservice:PostService) { }

  
  onchangelogint(logininformation:any){
    this.logged_in_username=logininformation;
    

  }
  ngOnInit(): void {

   
    this.http.get(environment.userUrl).subscribe((result:any=[])=>{
      this.logged_in_username=result[1];
      
    })


    this.postservice.getAllPost().subscribe((result)=>{
      this.posts=result;
      // console.log(this.posts)
      

    })

    

    // this.http.get(environment.url).subscribe((result:any=[])=>{
    //   this.posts=result;
     
    
    

    //   // let number_of_links=5;
    //   // let pupular_links=[];
    //   // pupular_links=this.posts.sort((a:any, b:any) => {return  parseInt(b.vote) -parseInt(a.vote);});
    //   // this.most_pupular_links=pupular_links.splice(0,5);
      
    

      
    // })

    this.http.get(environment.url).subscribe((result:any=[])=>{
      this.all_posts=result;
      
      

      let number_of_links=5;
      let pupular_links=[];
      pupular_links=this.all_posts.sort((a:any, b:any) => {return  parseInt(b.vote) -parseInt(a.vote);});
      this.most_pupular_links=pupular_links.splice(0,5);
      
    

      
    })


    this.http.get(environment.userUrl).subscribe((result:any=[])=>{
      this.users=result;
      
      let tempGroceries:any[] = this.users;

      let random_users:any[] = [];
      let randomGroceriesIndex = [];

      for(let i=0; i<3; i++) {
        let randomIndex = Math.floor(Math.random() * tempGroceries.length);
        let index = this.users.findIndex(o => o === tempGroceries[randomIndex]);
        randomGroceriesIndex.push(index);
        random_users.push(tempGroceries[randomIndex]); 
        tempGroceries = tempGroceries.filter(o => o !==  tempGroceries[randomIndex]);
      }

      this.active_profiles=random_users;
      
      // let user_number=2
      // let random_users=[]
      // for(let i=0;i<=user_number;i++){
      //   var item = this.users[Math.floor(Math.random()*this.users.length)];
        
      //   console.log(item)
      // }
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

 
  onclickedLogin(template: TemplateRef<any>){
   
    
    
    this.modalRef = this.modalService.show(template);
  }

}
