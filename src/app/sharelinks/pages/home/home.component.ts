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
  active_profiles:any[];
  users:[];
  most_pupular_links:any[];

  
  


  constructor(private postsApi:PostApiService,private http:HttpClient) { }

  ngOnInit(): void {

    this.http.get(environment.url).subscribe((result:any=[])=>{
      this.posts=result;
      console.log(this.posts)

      let number_of_links=5;
      let pupular_links=[];
      pupular_links=this.posts.sort((a:any, b:any) => {return  parseInt(b.vote) -parseInt(a.vote);});
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

}
