import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {StateService} from '../../services/StateServices/state.service'
import {HttpServiceService } from '../../services/HttpService/http-service.service'
import {state, updateDeleteState} from '../../models/stateModel/state'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material/dialog'
//import { ConfirmDialogModel,ConfDialogComponent } from '../conf-dialog/conf-dialog.component';
import {ConfDialogComponent, ConfirmDialogModel} from '../SharedComponent/conf-dialog/conf-dialog.component'
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  public stateDetails: FormGroup;
  Statelist:any;
  result='';
  constructor(
    private _stateServices:StateService,
    private _HttpService:HttpServiceService ,
    private _ngPopup:NgbModal,
    private _popup:MatDialog,
  ) { }

  ngOnInit(): void {
    this.stateDetails = new FormGroup({
      stateName: new FormControl('', [Validators.required]),
      stateCode: new FormControl('', [Validators.required]),
    });
    this.GetStatelist();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.stateDetails.controls[controlName].hasError(errorName);
  }

  SaveState() {
    if (this.stateDetails.invalid) {
      return;
    }
    var stateDetails = new state();
    stateDetails.actionType = "Insert";
    stateDetails.stateName = this.stateDetails.controls['stateName'].value;
    stateDetails.stateCode = this.stateDetails.controls['stateCode'].value;
    stateDetails.userId = 45;
    console.log(stateDetails);
    this._stateServices.InsertUpdateDeleteState(stateDetails).subscribe(data => {
      this.GetStatelist();
      this._HttpService.DisplayMessage(data['message']);
    }, err => {
      console.log(err);
    })
  }

  GetStatelist() {
  let userID = 25;
    this._stateServices.GetState(0, userID).subscribe(data => {
      this.Statelist = data['getStateList'];
    }, err => {
      console.log(err);
    })
  }
  DeleteState(state) {
    console.log(state);
    const Title = 'Delete State';
    const Message = 'Are You Sure Want to delete the State ?'
    const dialogData = new ConfirmDialogModel(Title, Message);
    const dialogRef = this._popup.open(ConfDialogComponent, {
      width: "500px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      console.log(this.result);
      if (this.result) {
        var DeleteStateInfo = new updateDeleteState();
        DeleteStateInfo.actionType = "Delete";
        DeleteStateInfo.stateId = state.stateId;
        DeleteStateInfo.stateName = state.stateName;
        DeleteStateInfo.stateCode = state.stateCode;
        DeleteStateInfo.userId = 2;
        this._stateServices.InsertUpdateDeleteState(DeleteStateInfo).subscribe(data => {
          this.GetStatelist();
          this._HttpService.DisplayMessage(data['message']);
        }, err => {
          console.log(err);
        })
      }
    });
  }

 openModal(targetModal, state) {
  console.log(state);
  this._ngPopup.open(targetModal, {
     centered: true,
     backdrop:true
    });
  }
}
