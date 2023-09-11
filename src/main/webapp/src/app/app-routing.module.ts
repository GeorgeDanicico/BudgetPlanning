import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { NotesComponent } from './notes/notes.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'login', 
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register', 
    component: RegisterComponent,
    canActivate: [AuthGuard]},
  {
    path: 'dashboard', 
    component: SidenavComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'todos',
    component: SidenavComponent,
    canActivate: [AuthGuard]
  }
 ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
