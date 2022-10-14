import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthIntercaptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        localStorage.setItem("token","afsjkfuer67gr78tfg7");
        const token = localStorage.getItem("token");
        if (!token || req.url.search("/auth/login") > 0 || req.url.search("/auth/signup") > 0  ) {
            return next.handle(req);
          }
      
          const req1 = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
          });
      
          return next.handle(req1);
    }
}
