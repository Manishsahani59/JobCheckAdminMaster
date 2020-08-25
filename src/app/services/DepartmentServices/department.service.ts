import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment'
import {HttpServiceService} from '../HttpService/http-service.service'
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  BaseUrl=environment.baseUrl;
  constructor(private _httpServices:HttpServiceService) { }
  InsertUpdateDeleteDepartment(payload){
    let url=this.BaseUrl+'Department_InsertUpdateDelete';
    return this._httpServices.Post(url,payload);
 }

 GetDepartment(DepartmentId,UserId){
 let url=this.BaseUrl+'DepartmentId/'+DepartmentId+'/UserId/'+UserId;
 return this._httpServices.Get(url);
}
}
