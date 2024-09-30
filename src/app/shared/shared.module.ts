import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailsMenuComponent } from './course-details-menu/course-details-menu.component';

import { HttpClientModule } from '@angular/common/http';
import { AssessmentProgressComponent } from './assessment-progress/assessment-progress.component';
import { StudentsAttendanceComponent } from './students-attendance/students-attendance.component';

import { BaseChartDirective } from 'ng2-charts';





@NgModule({
  declarations: [
    CourseDetailsMenuComponent,
    AssessmentProgressComponent,
    StudentsAttendanceComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BaseChartDirective
  ],
  exports:[
    CourseDetailsMenuComponent,
    AssessmentProgressComponent,
    StudentsAttendanceComponent
  ]
})
export class SharedModule { }
