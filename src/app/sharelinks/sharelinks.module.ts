import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharelinksRoutingModule } from './sharelinks-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { PostsComponent } from './pages/posts/posts.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { SortComponent } from './pages/sort/sort.component';
import { PipesModule } from '../shared/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    UsersComponent,
    PostsComponent,
    HeaderComponent,
    FooterComponent,
    SortComponent,
    

    
  ],
  imports: [
    CommonModule,
    SharelinksRoutingModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule

    

  ]
})
export class SharelinksModule { }
