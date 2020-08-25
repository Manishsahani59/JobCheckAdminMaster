import { Component, OnInit } from '@angular/core';
import {IndustryTypeService} from '../../services/IndustryTypeServices/industry-type.service' 
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {IndustryType} from '../../models/IndustryTypeModel/IndustryType'
import { HttpServiceService } from '../../services/HttpService/http-service.service'
import { ConfirmDialogModel,ConfDialogComponent } from '../conf-dialog/conf-dialog.component';
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: 'app-industry-type',
  templateUrl: './industry-type.component.html',
  styleUrls: ['./industry-type.component.scss']
})
export class IndustryTypeComponent implements OnInit {
  public IndustryTypeDetails: FormGroup;
  IndustryTypelist: any;
  result: any;

  constructor(
    private _IndustryTypeServices:IndustryTypeService,
    private _HttpService:HttpServiceService,
    private _popup:MatDialog
  ) { }

  ngOnInit(): void {
    this.IndustryTypeDetails = new FormGroup({
      IndustryTypeName: new FormControl('', [Validators.required]),
      IndustryTypeCode: new FormControl('', [Validators.required]),
    });
    this.GetIndustryTypelist();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.IndustryTypeDetails.controls[controlName].hasError(errorName);
  }
  GetIndustryTypelist() {
    let UserID = 22;
    this._IndustryTypeServices.GetIndustryType(0, UserID).subscribe(data => {
    this.IndustryTypelist = data['industryLists'];
    console.log(this.IndustryTypelist);
  }, error => {
    console.log(error);
  })
}

  AddIndustryType() {
    var IndustryTypeInfo = new IndustryType();
    IndustryTypeInfo.actionType = "Insert";
    IndustryTypeInfo.industryTypeName = this.IndustryTypeDetails.controls['IndustryTypeName'].value;
    IndustryTypeInfo.industryTypeCode = this.IndustryTypeDetails.controls['IndustryTypeCode'].value;
    IndustryTypeInfo.userId = 22;
    this._IndustryTypeServices.InsertUpdateDeleteIndustryType(IndustryTypeInfo).subscribe(data => {
      this.GetIndustryTypelist();
      this._HttpService.DisplayMessage(data['message']);
    }, error => {
      console.log(error);
    })

  }
  DeleteIndustryType(industryType) {
    console.log(industryType);
    const Title = "Delete IndustryType"
    const message = `Are You Sure Want to Delete the Industry Type.`;
    const dialogData = new ConfirmDialogModel(Title, message);
    const dialogRef = this._popup.open(ConfDialogComponent, {
      width: "500px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      console.log(this.result);
      if (this.result) {
        var DeleteIndustryTypeInfo = new IndustryType();
        DeleteIndustryTypeInfo.actionType = "Delete";
        DeleteIndustryTypeInfo.industryTypeId = industryType.industryTypeId;
        DeleteIndustryTypeInfo.industryTypeName = industryType.industryTypeName;
        DeleteIndustryTypeInfo.industryTypeCode = industryType.industryTypeCode;
        DeleteIndustryTypeInfo.userId = 22;
        this._IndustryTypeServices.InsertUpdateDeleteIndustryType(DeleteIndustryTypeInfo).subscribe(data => {
          this.GetIndustryTypelist();
          this._HttpService.DisplayMessage(data['message']);
        }, error => {
          console.log(error);
        })
      }

    });
  }




}

