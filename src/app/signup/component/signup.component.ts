import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/entity/user';
import { SignupService } from 'src/app/signup/core/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = new User();
  constructor(private service : SignupService,private router:Router) { }

  ngOnInit(): void {
  }

  userSignup(){
    this.service.signupUserFromClient(this.user).pipe(take(1)).subscribe(
      data => {
        localStorage.setItem('token',data.token)
        localStorage.setItem('userId',data.user.id)
        localStorage.setItem('user',data.user.firstName)
        var div=<HTMLElement> document.querySelector(".javasuccess");
        div.innerHTML="register your account successfully ,redirecting to your account ...";
        setTimeout(() => {
          this.router.navigate(['/account']); 
       }, 2000);
        
      },
      error => {
        var div=<HTMLElement> document.querySelector(".javaerror");
        div.innerHTML="ERROR: "+error.error.message;
      
      }
  
  
    );
  }

}
