import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  users:any;
  @Output() logged_in_username:EventEmitter<any>= new EventEmitter();
  newUser={
    "userName":``,
    "userProfile":``,
    "firstName":``,
    "lastName":``,
    "password":``,
    "email":``,

  }


  constructor(private http:HttpClient,private route:Router) { }

  ngOnInit(): void {

    this.http.get(environment.userUrl).subscribe(
      (result)=>{
        this.users=result
      }
    )




    this.registerForm=new FormGroup({
      "firstName":new FormControl('سمانه'),
      "lastName":new FormControl('رضایی'),
      "userName":new FormControl('saman',Validators.required),
      "password":new FormControl('123456',Validators.required),
      "confirm_password":new FormControl('123456',Validators.required),
      "userProfile":new FormControl('http://localhost:4200/assets/images/user_images/user5.jpg'),
      "email":new FormControl('s@gmail.com',[Validators.required,Validators.email])
    })
  }

  onRejisterSubmit(formdata:any){
  

    this.newUser={
      "userName":`${formdata.userName}`,
      "userProfile":`${formdata.userProfile}`,
      "firstName":`${formdata.firstName}`,
      "lastName":`${formdata.lastName}`,
      "password":`${formdata.password}`,
      "email":`${formdata.email}`,

    }

    this.users.push(this.newUser)
    this.logged_in_username.emit(this.newUser)
    this.route.navigate([''])

    

  }

}
