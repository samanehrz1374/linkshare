import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { NgPipesModule } from 'ngx-pipes';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

// import { DateAsAgoPipe } from './shared/pipes/date-as-ago.pipe';



@NgModule({
  declarations: [
    AppComponent,
    // DateAsAgoPipe,
    // TimeAgoPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
    // BrowserAnimationsModule
  

      
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent],
  exports: [
    
  ]
})
export class AppModule { }
