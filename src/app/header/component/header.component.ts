import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  showLogout:boolean = false;
  constructor(private router: Router) {
    // on route change to '/login', set the variable showHead to false
    router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (event['url'] == '/login' || event['url'] == '/signup' ) {
            this.showLogout = false;
          } else {
            this.showLogout = true;
            alert(this.showLogout);
          }
        }
      });
    }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
