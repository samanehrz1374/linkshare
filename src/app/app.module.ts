import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { NgPipesModule } from 'ngx-pipes';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateAsAgoPipe } from './shared/pipes/date-as-ago.pipe';



@NgModule({
  declarations: [
    AppComponent,
    DateAsAgoPipe,
    // TimeAgoPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  

      
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    DateAsAgoPipe
  ]
})
export class AppModule { }
