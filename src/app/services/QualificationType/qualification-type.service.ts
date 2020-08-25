import { Injectable } from '@angular/core';
import {HttpServiceService} from '../HttpService/http-service.service'
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class QualificationTypeService {
  BaseUrl=environment.baseUrl;
  constructor(
    private _httpServices:HttpServiceService,
  ) { }
  GetQulaificationType(QualificationTypeId,UserId){
    let url=this.BaseUrl+'QualificationTypeId/'+QualificationTypeId+'/UserId/'+UserId;
    return this._httpServices.Get(url);
  }

  InsertUpdateDeleteQualificationtype(payload){
    let url =this.BaseUrl+'Qualification_InsertUpdateDelete';
    return this._httpServices.Post(url,payload);
  }

}
