import { Component, OnInit, ViewChild } from '@angular/core';
// import { ConfDialogComponent,ConfirmDialogModel } from '../conf-dialog/conf-dialog.component';

import {ConfDialogComponent, ConfirmDialogModel} from '../SharedComponent/conf-dialog/conf-dialog.component'
import {MatDialog} from '@angular/material/dialog'
import { FormGroup, Validators, FormControl,FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {DepartmentService} from '../../services/DepartmentServices/department.service'
import {HttpServiceService} from '../../services/HttpService/http-service.service'
import {Department,UpdateDeleteDepartment} from '../../models/DepartmentModel/Department'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery'
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  result='';
  isLoading:boolean;
  public DepartmentDetails: FormGroup;
  public updateDepartmentDetails:FormGroup;
 
  updateDepartment:any;
  Departmentlist=new MatTableDataSource<any>();
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(
    private _popup:MatDialog,
    private _DerpartmentServices:DepartmentService,
    private _httpSevices:HttpServiceService,
    private _ngPopup:NgbModal,
    private fb: FormBuilder
    ){ }

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    //this.Departmentlist.paginator=this.paginator;
    this.DepartmentDetails = new FormGroup({
      DepartmentName: new FormControl('', [Validators.required]),
      DepartmentCode: new FormControl('', [Validators.required]),
    });

    this.updateDepartmentDetails =  new FormGroup({
      Departmentname: new FormControl('', [Validators.required]),
      Departmentcode: new FormControl('', [Validators.required]),
    });
 
    

    this.GetDepartmentlist();
  
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.DepartmentDetails.controls[controlName].hasError(errorName);
  }
  public updatehasError = (controlName: string, errorName: string) => {
    return this.updateDepartmentDetails.controls[controlName].hasError(errorName);
  }

  AddDepartment() {
    var DepartmentDetails = new Department();
    DepartmentDetails.actionType = "Insert";
    DepartmentDetails.departmentName = this.DepartmentDetails.controls['DepartmentName'].value;
    DepartmentDetails.departmentCode = this.DepartmentDetails.controls['DepartmentCode'].value;
    DepartmentDetails.userId = 5;
    this._DerpartmentServices.InsertUpdateDeleteDepartment(DepartmentDetails).subscribe(data => {
      this.GetDepartmentlist();
      this._httpSevices.DisplayMessage(data);
      this.DepartmentDetails.clearValidators;
    }, err => {
      console.log(err);
    });
  }
  GetDepartmentlist() {
    this.isLoading=true;
    let userID = 2;
    this._DerpartmentServices.GetDepartment(0, userID).subscribe(data => {
      this.Departmentlist = data['departmentList'];
      console.log(this.Departmentlist);
      this.isLoading=false;
    }, err => {
      console.log(err);
    });
 }

  DeleteDepartment(Department) {
    const Title = 'Delete Department';
    const Message = 'Are You Sure Want to delete the Department ?'
    const dialogData = new ConfirmDialogModel(Title, Message);
    const dialogRef = this._popup.open(ConfDialogComponent, {
      width: "500px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        var DeleteDepartmentInfo = new UpdateDeleteDepartment();
        DeleteDepartmentInfo.actionType = "Delete";
        DeleteDepartmentInfo.departmentId = Department.departmentId;
        DeleteDepartmentInfo.departmentName = Department.departmentName;
        DeleteDepartmentInfo.departmentCode = Department.departmentCode;
        DeleteDepartmentInfo.userId = 5;
        console.log(DeleteDepartmentInfo);
        this._DerpartmentServices.InsertUpdateDeleteDepartment(DeleteDepartmentInfo).subscribe(data => {
        this.GetDepartmentlist();
        this._httpSevices.DisplayMessage(data['message']);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  ModefyDepartment(){
    var updateDepartmentInfo = new UpdateDeleteDepartment();
    updateDepartmentInfo.actionType = "Update";
    updateDepartmentInfo.departmentId = this.updateDepartment['departmentId'];
    updateDepartmentInfo.departmentName = this.DepartmentDetails.controls['DepartmentName'].value;
    updateDepartmentInfo.departmentCode = this.DepartmentDetails.controls['DepartmentCode'].value;
    updateDepartmentInfo.userId = 22;
    console.log(updateDepartmentInfo);
    this._DerpartmentServices.InsertUpdateDeleteDepartment(updateDepartmentInfo).subscribe(data => {
      this.GetDepartmentlist();
      this._ngPopup.dismissAll();
      this._httpSevices.DisplayMessage(data['message']);
    }, err => {
      console.log(err);
    });


  }
  openModal(targetModal, Department) {
    this.updateDepartment=Department;
    this._ngPopup.open(targetModal, {
     centered: true,
     backdrop:true
    });
  }

 
}

