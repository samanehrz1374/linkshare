import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
  @Output() newestpost: EventEmitter<string> = new EventEmitter();
  @Input() mode:string;
  // modes=['جدیدترین']

  Isnewst:boolean=true;
  IsOldest:boolean;
  IsMostLike:boolean;
  IsLeastLike:boolean;

  constructor() { }

  ngOnInit(): void {
  }

  newest(typeOfEvent:string){

    if(typeOfEvent=="newest"){
      if(this.Isnewst==true){
        this.IsOldest=false;
        this.Isnewst=false;
      }else{
        this.IsOldest=false;
        this.Isnewst=true;
        if(this.IsLeastLike==true ){
          this.newestpost.emit("newestleastliked")
          // this.newestpost.emit(typeOfEvent)



        }
        else if(this.IsMostLike==true){
          this.newestpost.emit("newestmostliked")
          // this.newestpost.emit(typeOfEvent)



        }
        else{

          this.newestpost.emit(typeOfEvent)
        }


      }
      

    }
    if(typeOfEvent=="oldest"){
      if(this.IsOldest==true){
        this.Isnewst=false;
        this.IsOldest=false;
      }else{
        this.Isnewst=false;
        this.IsOldest=true;
        if(this.IsLeastLike==true ){
          this.newestpost.emit("oldestleastliked")
          // this.newestpost.emit(typeOfEvent)



        }
        else if(this.IsMostLike==true){
          this.newestpost.emit("oldestmostliked")
          // this.newestpost.emit(typeOfEvent)



        }
        else{

          this.newestpost.emit(typeOfEvent)
        }

      }
    }

    if(typeOfEvent=="mostliked"){
      if(this.IsMostLike==true){
        this.IsMostLike=false;
        this.IsLeastLike=false;
      }else{
        this.IsLeastLike=false;
        this.IsMostLike=true;
        if(this.Isnewst==true ){
          this.newestpost.emit("newestmostliked")
          // this.newestpost.emit(typeOfEvent)



        }
        else if(this.IsOldest==true){
          this.newestpost.emit("oldestmostliked")
          // this.newestpost.emit(typeOfEvent)



        }
        else{

          this.newestpost.emit(typeOfEvent)
        }
   

      }
      

    }
    if(typeOfEvent=="leastliked"){
      if(this.IsLeastLike==true){
        this.IsLeastLike=false;
        this.IsMostLike=false;
      }else{
        this.IsMostLike=false;
        this.IsLeastLike=true;

        if(this.Isnewst==true ){
          this.newestpost.emit("newestleastliked")
          // this.newestpost.emit(typeOfEvent)



        }
        else if(this.IsOldest==true){
          this.newestpost.emit("oldestleastliked")
          // this.newestpost.emit(typeOfEvent)



        }
        else{

          this.newestpost.emit(typeOfEvent)
        }
      }
    }
    
    

    // this.newestpost.emit(typeOfEvent)

  }

}
