import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DesignationService} from '../../services/DesignationSerivces/designation.service'
import {HttpServiceService} from '../../services/HttpService/http-service.service'
import {Designation,updateDeleteDesignation} from '../../models/DesignationModel/Designation'
// import { ConfirmDialogModel,ConfDialogComponent } from '../conf-dialog/conf-dialog.component';

import {ConfDialogComponent, ConfirmDialogModel} from '../SharedComponent/conf-dialog/conf-dialog.component'
import {MatDialog} from '@angular/material/dialog'
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {
  public DesignationInfo: FormGroup;
  Designationlist: any;
  result: any;
  constructor(
    private _DesignationServices:DesignationService,
    private _HttpService:HttpServiceService,
    private _popup:MatDialog
  ) { }

  ngOnInit(): void {
    this.DesignationInfo = new FormGroup({
      DesignationName: new FormControl('', [Validators.required]),
      DesignationCode: new FormControl('', [Validators.required]),
    });
    this.GetDesignationlist();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.DesignationInfo.controls[controlName].hasError(errorName);
  }

  GetDesignationlist() {
    let userId = 22;
    this._DesignationServices.GetDesignation(0, userId).subscribe(data => {
      console.log(this.DesignationInfo);
    this.Designationlist = data['designationlist'];
    },err => {
      console.log(err);
    })
  }

  SaveDesignation() {
  
    if (this.DesignationInfo.invalid)
      return;
    var Designationinfo = new Designation();
    Designationinfo.actionType = "Insert";
    Designationinfo.designationName = this.DesignationInfo.controls['DesignationName'].value;
    Designationinfo.designationCode = this.DesignationInfo.controls['DesignationCode'].value;
    Designationinfo.userId = 2;
    console.log(Designationinfo);
    this._DesignationServices.InsertUpdateDelelteDesignation(Designationinfo).subscribe(data => {
     console.log(data);
     this.GetDesignationlist();
     this._HttpService.DisplayMessage(data['message']);
    }, err => {
      console.log(err);
    });
  }
  DeleteDesignation(DeleteDesignationPayload) {
    console.log(DeleteDesignationPayload);
    const Title = 'Delete Designation';
    const Message = 'Are You Sure Want to delete the Designation ?'
    const dialogData = new ConfirmDialogModel(Title, Message);
    const dialogRef = this._popup.open(ConfDialogComponent, {
      width: "500px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        var DeleteDesignationInfo = new updateDeleteDesignation();
        DeleteDesignationInfo.actionType = "Delete";
        DeleteDesignationInfo.designationId = DeleteDesignationPayload.designationId;
        DeleteDesignationInfo.designationName = DeleteDesignationPayload.designationName;
        DeleteDesignationInfo.designationCode = DeleteDesignationPayload.designationCode;
        DeleteDesignationInfo.userId = 22;
        this._DesignationServices.InsertUpdateDelelteDesignation(DeleteDesignationInfo).subscribe(data => {
        this.GetDesignationlist();
        this._HttpService.DisplayMessage(data['message']);
        }, err => {
          console.log(err);
        });
      }
  });
}


}
