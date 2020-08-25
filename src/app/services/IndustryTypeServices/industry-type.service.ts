import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment'
import {HttpServiceService} from '../HttpService/http-service.service'
@Injectable({
  providedIn: 'root'
})
export class IndustryTypeService {
  BaseUrl=environment.baseUrl;

  constructor(
    private _HttpService:HttpServiceService
  ) { }
  GetIndustryType(IndustryTypeId,UserId){
    let url = this.BaseUrl + 'IndustryId/'+IndustryTypeId+'/UserId/'+UserId;
    return this._HttpService.Get(url);
  }

  InsertUpdateDeleteIndustryType(payload){
    let url=this.BaseUrl + 'IndustryType_InsertUpdateDelete';
    return this._HttpService.Post(url,payload);
  }  

}
