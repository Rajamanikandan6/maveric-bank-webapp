import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../entity/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private _http:HttpClient) { }

  public signupUserFromClient(user :User):Observable<any>{

    return this._http.post<any>("http://localhost:8000/api/v1/auth/signup",user)
  }
}
