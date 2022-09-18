import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:string='سمانه';

  


  constructor(private http:HttpClient) { }

  ngOnInit(): void {

   
    
    



    
    
  }
 
    
  

}
