import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWeather } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WheatherService {



  constructor(private http:HttpClient) { }


  get_Weather():Observable<IWeather[]>{
    return this.http.get<IWeather[]>(environment.api)

  }
}
