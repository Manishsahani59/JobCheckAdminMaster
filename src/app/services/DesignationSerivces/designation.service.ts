import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment'
import {HttpServiceService} from '../HttpService/http-service.service'
@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  BaseUrl=environment.baseUrl;

  constructor(
    private _HttpService:HttpServiceService
      ) { }
  GetDesignation(DesignationId,userId){
    let url=this.BaseUrl+'DesignationId/'+DesignationId+'/UserId/'+userId;
   return this._HttpService.Get(url);
  }
  InsertUpdateDelelteDesignation(Payload){
    let url=this.BaseUrl+'Designation_InsertUpdateDelete';
    return this._HttpService.Post(url,Payload);
  }
}
