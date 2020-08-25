import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpServiceService} from '../HttpService/http-service.service'
@Injectable({
  providedIn: 'root'
})
export class DistrictServicsService {
  BaseUrl=environment.baseUrl;
  constructor(
    private _HttpService:HttpServiceService
     ) { }
  InsertUpdateDeleteDistrict(payload)
  {
   let Url=this.BaseUrl+'District_InsertUpdateDelete';
   console.log(Url);
   return this._HttpService.Post(Url,payload); 
  }

  GetDistrict(DistrictId,UserID)
  {
   let Url=this.BaseUrl+'User/'+UserID+'/District/'+DistrictId;
   console.log(Url);
   return this._HttpService.Get(Url); 
  }

}
