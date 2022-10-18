import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/component/login/login.component';

const routes: Routes = [
  {path:'',loadChildren:() => import('./signup/signup.module')
  .then(mod=>mod.SignupModule)},

  {path:'',loadChildren:() => import('./login/login.module')
  .then(mod=>mod.LoginModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
