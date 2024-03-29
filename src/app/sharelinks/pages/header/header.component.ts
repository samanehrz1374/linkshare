import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName:string='nasim';
  @Input() logged_in_username={
    userName:"",
    userProfile:"",
    firstName:"",
    lastName:"",
    password:"",
    email:""
    
  };
 
  @Output() login:EventEmitter<any>=new EventEmitter()
  login_clicked:boolean=true
  
  
 
  
  searchValue:string;

  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter();
  isSearch:boolean=false;


  


  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    

    
  }



  onSearchTextCahnged(){
    this.isSearch=!this.isSearch;
    this.searchTextChanged.emit(this.searchValue);


  }

  profile(){
  
    this.router.navigate(['personalpage',this.userName])

  }


  onClickLogin(){
    this.login.emit(this.login_clicked)
  

  }
 
    
  

}
