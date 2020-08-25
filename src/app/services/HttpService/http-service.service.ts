import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(
    private _httpServices:HttpClient,
    private _snakeBar: MatSnackBar,
    ) { }

  Get(url){
   return this._httpServices.get(url);
  }
   Post(url,data){
    return this._httpServices.post(url,data);
  }
  
  DisplayMessage(data) {
    this._snakeBar.open(data, 'close', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['snackbar']
    });
  }


}
