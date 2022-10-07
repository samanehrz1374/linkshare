import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../http/auth.service';

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
  modalRef: BsModalRef;
  is_password_notEqual:boolean=false;
  is_userName_exist:boolean=false;
  status:number=0;


  constructor(private loginservise:AuthService,private http:HttpClient,private route:Router,private modalService: BsModalService) { }

  ngOnInit(): void {

    this.http.get(environment.userUrl).subscribe(
      (result)=>{
        this.users=result
      }
    )




    this.registerForm=new FormGroup({
      "firstName":new FormControl('سمانه'),
      "lastName":new FormControl('رضایی'),
      "userName":new FormControl('saman',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "password":new FormControl('159753Mm@',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      "confirm_password":new FormControl('159753Mm@',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      "userProfile":new FormControl('http://localhost:4200/assets/images/user_images/user5.jpg'),
      "email":new FormControl('s@gmail.com',[Validators.required,Validators.email])
    })
  }

  onRejisterSubmit(formdata:any){

    this.http.get(environment.userUrl).subscribe((result:any)=>{
      this.users=result;

      this.status=this.loginservise.userName_exist(this.users,formdata)

      if (this.status===200){
        console.log(this.status)
        
        this.is_userName_exist=true;

      }
      if(this.is_userName_exist===false){
  
        if(formdata.password === formdata.confirm_password){
    
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
          
          // this.route.navigate([''])  
        }else{
          this.is_password_notEqual=true;
        }
      }
    })


  


    

  }

}
