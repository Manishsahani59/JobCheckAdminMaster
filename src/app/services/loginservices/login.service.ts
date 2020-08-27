import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment'
import { LoginModel, UserProfile } from '../../models/Login/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  Url: string;
  token: string;
  header: any;
  skey = "123";
  UserType = "1";
  BaseUrl=environment.baseUrl;
  constructor(private http: HttpClient) {

    this.Url = 'https://localhost:44310/api/Login/';

    const headerSettings: { [name: string]: string | string[]; } = { 'Content-Type': 'application/json' };
    this.header = new HttpHeaders(headerSettings);
   }

    Login(model: LoginModel):Observable<any> {
     model.sKey = this.skey;
     model.userType = this.UserType;
   
      console.log(model)
     let a = this.Url + 'GetLoginDetails';
     return this.http.post<any>(this.Url + 'GetLoginDetails', model, { headers: this.header });
   }


  // Login(payload){
   //  let url=this.Url+'GetLoginDetails';
  //   return this.http.post(url,payload);
  // }
}

