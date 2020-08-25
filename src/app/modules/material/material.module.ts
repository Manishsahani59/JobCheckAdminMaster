import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table' 
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,MatInputModule,MatPaginatorModule,MatTableModule,
    MatSnackBarModule,MatSelectModule
  ],exports:[
    MatButtonModule,
    MatDialogModule,MatInputModule,MatPaginatorModule,MatTableModule,
    MatSnackBarModule,MatSelectModule 
  ]
})
export class MaterialModule { }
