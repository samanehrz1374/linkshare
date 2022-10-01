import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
  @Output() newestpost: EventEmitter<string> = new EventEmitter();
  @Input() mode:string;

  Isnewst:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }

  newest(typeOfEvent:string){
    this.newestpost.emit(typeOfEvent)

  }

}
