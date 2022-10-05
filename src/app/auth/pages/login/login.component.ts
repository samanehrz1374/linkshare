import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../http/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  status:number;
  users:any;
  error:string;

  

  constructor(private loginservise:AuthService,private http:HttpClient,private route:Router) { }

  ngOnInit(): void {
    

    this.loginForm= new FormGroup({
      "userName":new FormControl('',Validators.required),
      "password":new FormControl('', Validators.required),
    })

  }

  onLoginSubmit(formdata:any){
    console.log(formdata.userName)

    
    this.http.get(environment.userUrl).subscribe((result:any)=>{
      this.users=result;

      this.status=this.loginservise.login(this.users,formdata)
      if (this.status===200){
        this.route.navigate([''])

      }else{

        this.route.navigate(['auth/login'])
        this.error='نام کاربری یا کلمه عبور اشتباه است'

      }


      

      

      
      

    });


  



  }

}
