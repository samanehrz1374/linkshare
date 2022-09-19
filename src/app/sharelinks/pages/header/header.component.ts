import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:string='سمانه';
  searchValue:string;
  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter();


  


  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    
  }

  onSearchTextCahnged(){
    this.searchTextChanged.emit(this.searchValue);


  }
 
    
  

}
