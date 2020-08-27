import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {LocationService  } from '../../services/LocationServices/location.service';
import { HttpServiceService } from '../../services/HttpService/http-service.service';
// import { ConfirmDialogModel,ConfDialogComponent } from '../conf-dialog/conf-dialog.component';
import {ConfDialogComponent, ConfirmDialogModel} from '../SharedComponent/conf-dialog/conf-dialog.component'
import {MatDialog} from '@angular/material/dialog' 
import {AddlLocation,UpdateDeleteLocation} from '../../models/LocationModel/Location'

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  public LocationDetails: FormGroup;
  result: any;
  Locationlist: any;
  DistId:any=['1','2'];
  constructor(
    private _LocationService:LocationService ,
    private _HttpService:HttpServiceService,
    private _popup:MatDialog
  ) { }

  ngOnInit(): void {
    this.LocationDetails = new FormGroup({
      DistrictId: new FormControl('', [Validators.required]),
      StateId: new FormControl('', [Validators.required]),
      LocationName: new FormControl('', [Validators.required]),
      LocationCode: new FormControl('', [Validators.required]),
    });
    this.GetLocationlist();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.LocationDetails.controls[controlName].hasError(errorName);
  }
  GetLocationlist() {
    let UserId = 2;
    this._LocationService.GetLocation(0, UserId).subscribe(data => {
    this.Locationlist = data['locationsList'];
    console.log(this.Locationlist);
     }, err => {
    console.log(err);
  });
}


InsertLocation() {
  if (this.LocationDetails.invalid) {
    return;
  }
  var LocationDetails = new AddlLocation();
  LocationDetails.actionType = "Insert";
  LocationDetails.DistrictId = parseInt(this.LocationDetails.controls['DistrictId'].value);
  LocationDetails.stateId = parseInt(this.LocationDetails.controls['StateId'].value);
  LocationDetails.locationName = this.LocationDetails.controls['LocationName'].value;
  LocationDetails.locationCode = this.LocationDetails.controls['LocationCode'].value;
  LocationDetails.userId = 222;
  console.log(this.LocationDetails.value);
  this._LocationService.InserUpdateDeleteLocation(LocationDetails).subscribe(data => {
    this.GetLocationlist();
    this._HttpService.DisplayMessage(data['message']);
  }, err => {
    console.log(err);
  })
}

  DelleteLocation(LocationDetails) {
    console.log(LocationDetails);
    const Title = 'Delete Location';
    const Message = 'Are You Sure Want to delete the Location ?'
    const dialogData = new ConfirmDialogModel(Title, Message);
    const dialogRef = this._popup.open(ConfDialogComponent, {
      width: "500px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      console.log(this.result);
      if (this.result) {
        var DeletelocationInfo = new UpdateDeleteLocation();
        DeletelocationInfo.actionType = "Delete";
        DeletelocationInfo.locationId = parseInt(LocationDetails.locationId);
        DeletelocationInfo.DistrictId = parseInt(LocationDetails.districtId);
        DeletelocationInfo.stateId = parseInt(LocationDetails.stateId);
        DeletelocationInfo.locationName = LocationDetails.locationName;
        DeletelocationInfo.locationCode = LocationDetails.locationCode;
        DeletelocationInfo.userId = 222;
        console.log(DeletelocationInfo);
        this._LocationService.InserUpdateDeleteLocation(DeletelocationInfo).subscribe(data => {
          this.GetLocationlist();
          this._HttpService.DisplayMessage(data['message']);
        }, err => {
          console.log(err);
        })
      } else {

      }
    });
  }

}
