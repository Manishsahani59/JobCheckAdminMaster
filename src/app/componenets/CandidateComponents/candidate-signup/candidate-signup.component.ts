import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login/login.model';
import { LoginService } from 'src/app/services/loginservices/login.service';
import {HttpServiceService} from '../../../services/HttpService/http-service.service'
@Component({
  selector: 'app-candidate-signup',
  templateUrl: './candidate-signup.component.html',
  styleUrls: ['./candidate-signup.component.scss']
})
  export class CandidateSignupComponent implements OnInit {
  hide = true;
  model: LoginModel = {};
  errmgs: String;
  errorMessage: string;
  arrBirds: string [];
  constructor(private router: Router, private loginService: LoginService,private _HttpService:HttpServiceService) { }
  ngOnInit(): void {
  
  }
  Candidatelogin() {
    this.model.userType="1";
    this.model.sKey="123";
    //console.log('this data')
    this.loginService.Login(this.model).subscribe(
      data => {
        if (data) {
          if(data.message.result['errormsg']=='Login successful')
        {
          this.router.navigate(['']);
        }else{
         // this.errorMessage ='Login Details not found';
         this._HttpService.DisplayMessage(data.message.result['errormsg']);
        }

        }
        else {
          this.errorMessage ='Login Details not found';
        }
      },
      error => {
        this.errorMessage = error.message;
      });
  };
}
