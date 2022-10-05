import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      "firstName":new FormControl(''),
      "lastName":new FormControl(""),
      "userName":new FormControl("",Validators.required),
      "password":new FormControl("",Validators.required),
      "confirm_password":new FormControl("",Validators.required),
      "userProfile":new FormControl(''),
      "email":new FormControl("",Validators.required)
    })
  }

}
