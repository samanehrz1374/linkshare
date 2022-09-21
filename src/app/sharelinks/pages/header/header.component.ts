import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:string='نسیم';
  searchValue:string;
  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter();


  


  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  onSearchTextCahnged(){
    this.searchTextChanged.emit(this.searchValue);


  }

  profile(){
    console.log(this.router.url)
    this.router.navigate(['personalpage',this.userName])

  }
 
    
  

}
