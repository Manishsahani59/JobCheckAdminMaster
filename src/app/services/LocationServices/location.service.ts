import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment'
import {HttpServiceService} from '../HttpService/http-service.service';
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  BaseUrl=environment.baseUrl;
  constructor(
    private _HttpService:HttpServiceService
  ) { }
  GetLocation(LocationId,UserId){
    let url=this.BaseUrl+'LocationId/'+LocationId+'/UserId/'+UserId;
     return this._HttpService.Get(url);
    }

    InserUpdateDeleteLocation(payload){
      let url=this.BaseUrl+'Location_InsertUpdateDelete';
      return this._HttpService.Post(url,payload);
    }
}
