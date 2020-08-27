import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from '../app/modules/App-routing/app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from '../app/modules/material/material.module';
import { HomeComponent } from './componenets/home/home.component';
import { DashboardComponent } from './componenets/dashboard/dashboard.component';
import { StateComponent } from './componenets/state/state.component';
import { LocationComponent } from './componenets/location/location.component';
import { DepartmentComponent } from './componenets/department/department.component';
import {ConfDialogComponent} from './componenets/SharedComponent/conf-dialog/conf-dialog.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QualificationTypeComponent } from './componenets/qualification-type/qualification-type.component';
import { DesignationComponent } from './componenets/designation/designation.component';
import { IndustryTypeComponent } from './componenets/industry-type/industry-type.component';
import {CandidateSignupComponent } from './componenets/CandidateComponents/candidate-signup/candidate-signup.component'
import { SkillTypeComponent } from './componenets/skill-type/skill-type.component';
import { JobTypeComponent } from './componenets/job-type/job-type.component';
import { CourseTypeComponent } from './componenets/course-type/course-type.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    StateComponent,
    LocationComponent,
    DepartmentComponent,
    ConfDialogComponent,
    QualificationTypeComponent,
    DesignationComponent,
    IndustryTypeComponent,
    CandidateSignupComponent,
    SkillTypeComponent,
    JobTypeComponent,
    CourseTypeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule, ReactiveFormsModule,FormsModule, NgbModule
  ],
  providers: [],
  entryComponents:[ConfDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
