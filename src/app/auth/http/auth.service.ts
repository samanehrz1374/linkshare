import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  status:number;


  constructor(private http:HttpClient,private router:Router) { }

  login(users:any,formdata:any,){
    for (let i=0; i<users.length;i++){
        
      if (users[i].userName===formdata.userName && users[i].password===formdata.password){
        this.status=200;
        break
        
      }else{
        this.status=403;
        
      }
    }
    return this.status;





  }


  userName_exist(users:any,formdata:any,){
    
    for (let i=0; i<users.length;i++){
      
        
      if (users[i].userName===formdata.userName){
        
        this.status=200;
        break
        
      }else{
        this.status=403;
        
      }
    }
    return this.status;





  }

  logout(){
    this.router.navigate(['login'])
  }
}
