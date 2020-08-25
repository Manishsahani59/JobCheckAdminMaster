import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {QualificationType, UpdatedeleteQualificationType} from '../../models/QualificationTypeModel/QualificationTypeModel'
import {QualificationTypeService} from '../../services/QualificationType/qualification-type.service'
import {HttpServiceService} from '../../services/HttpService/http-service.service'
import { ConfirmDialogModel,ConfDialogComponent } from '../conf-dialog/conf-dialog.component';
import {MatDialog} from '@angular/material/dialog'
@Component({
  selector: 'app-qualification-type',
  templateUrl: './qualification-type.component.html',
  styleUrls: ['./qualification-type.component.scss']
})
export class QualificationTypeComponent implements OnInit {
  public QualificationInfo: FormGroup;
  QualificationTypelist: any;
  result: any;
  constructor(
    private _QualificationType:QualificationTypeService,
    private _HttpService:HttpServiceService,
    private _popup:MatDialog,
  ) { }

  ngOnInit(): void {
    this.QualificationInfo = new FormGroup({
      QualificationName: new FormControl('', [Validators.required]),
      QualificationCode: new FormControl('', [Validators.required])
    });
    this.GetQualificationTypelist();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.QualificationInfo.controls[controlName].hasError(errorName);
  }
  SaveQualification() {
    if (this.QualificationInfo.invalid)
      return;
    var QualificationSaveInfo = new QualificationType();
    QualificationSaveInfo.actionType = "Insert";
    QualificationSaveInfo.qualificationTypeName = this.QualificationInfo.controls['QualificationName'].value;
    QualificationSaveInfo.qualificationTypeCode = this.QualificationInfo.controls['QualificationCode'].value;
    QualificationSaveInfo.userId = 22;
    this._QualificationType.InsertUpdateDeleteQualificationtype(QualificationSaveInfo).subscribe(data => {
    this.GetQualificationTypelist();
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
  GetQualificationTypelist() {
    let UserId = 22;
    this._QualificationType.GetQulaificationType(0, UserId).subscribe(data => {
       this.QualificationTypelist = data['getQualificationType'];
       console.log(this.QualificationTypelist);
    }, err => {
      console.log(err);
    })
  }
  
  DeleteQualificationType(QualificationType) {
    const Title = 'Delete Qualification Type';
    const Message = 'Are You Sure Want to delete the Qualification Type ?'
    const dialogData = new ConfirmDialogModel(Title, Message);
    const dialogRef = this._popup.open(ConfDialogComponent, {
      width: "500px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        var QualificationTypeDeleteinfo = new UpdatedeleteQualificationType();
        QualificationTypeDeleteinfo.actionType = "Delete";
        QualificationTypeDeleteinfo.qualificationTypeId = QualificationType['qualificationTypeId'];
        QualificationTypeDeleteinfo.qualificationTypeName = QualificationType['qualificationTypeName'];
        QualificationTypeDeleteinfo.qualificationTypeCode = QualificationType['qualificationTypeCode'];
        QualificationTypeDeleteinfo.userId = 22;
        console.log(QualificationTypeDeleteinfo);
        this._QualificationType.InsertUpdateDeleteQualificationtype(QualificationTypeDeleteinfo).subscribe(data => {
          this.GetQualificationTypelist();
          this._HttpService.DisplayMessage(data['message']);
        }, err => {
          console.log(err);
        });
      }
    });
  }

}
