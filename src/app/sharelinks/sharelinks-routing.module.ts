import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'personalpage/:userName',component:UsersComponent},
  {path:'search/:tag',component:HomeComponent}
  // {path:':userName',component:UsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharelinksRoutingModule { }
