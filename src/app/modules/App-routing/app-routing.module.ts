import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../componenets/home/home.component'
import { DashboardComponent } from '../../componenets/dashboard/dashboard.component'
import {DepartmentComponent} from '../../componenets/department/department.component'
import {LocationComponent} from '../../componenets/location/location.component'
import {StateComponent } from '../../componenets/state/state.component' 
import {QualificationTypeComponent} from '../../componenets/qualification-type/qualification-type.component'
import {DesignationComponent} from '../../componenets/designation/designation.component'
import {IndustryTypeComponent} from '../../componenets/industry-type/industry-type.component'
import {CandidateSignupComponent} from '../../componenets/CandidateComponents/candidate-signup/candidate-signup.component'
import {JobTypeComponent} from '../../componenets/job-type/job-type.component'
import {SkillTypeComponent} from '../../componenets/skill-type/skill-type.component'

const routes: Routes = [

  {path:'Signup',component:CandidateSignupComponent},
  {
      path: '', component: HomeComponent, children: [
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: '', component: DashboardComponent },
      {path:'Department',component:DepartmentComponent},
      {path:'Location',component:LocationComponent},
      {path:'state',component:StateComponent},
      {path:'QualificationType',component:QualificationTypeComponent},
      {path:'Designation',component:DesignationComponent},
      {path:'IndustryType',component:IndustryTypeComponent},
      {path:'JobType',component:JobTypeComponent},
      {path:'SkillType',component:SkillTypeComponent},
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
