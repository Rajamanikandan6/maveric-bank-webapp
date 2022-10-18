import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './login/component/login/login.component';

const routes: Routes = [
  {path:'',loadChildren:() => import('./signup/signup.module')
  .then(mod=>mod.SignupModule)},

  {path:'',loadChildren:() => import('./login/login.module')
  .then(mod=>mod.LoginModule) },

  {path:'',loadChildren:() => import('./account/account.module')
  .then(mod=>mod.AccountModule),canActivate:[AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
