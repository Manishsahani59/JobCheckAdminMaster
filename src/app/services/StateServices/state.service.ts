import { Injectable } from '@angular/core';
import {HttpServiceService} from '../../services/HttpService/http-service.service'
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class StateService {
  Baseurl=environment.baseUrl;
  constructor(private _httpservices:HttpServiceService) { }

  InsertUpdateDeleteState(payload){
    let url=this.Baseurl+'State_InsertUpdateDelete';
    return this._httpservices.Post(url,payload);
  }

  GetState(StateId,UserID){
     let url=this.Baseurl+'StateId/'+StateId+'/UserId/'+UserID;
     return this._httpservices.Get(url);
  }

}
