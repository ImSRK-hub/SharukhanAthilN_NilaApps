import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private courseDetailsURL = 'course-details.json';
  private assessmentProgressURL = 'assessment-progress.json';
  private studentAttendanceURL = 'student-attendance.json';

  constructor(private http:HttpClient) { }

  getCourseDetails():Observable<any>{
    return this.http.get(this.courseDetailsURL);
  }

  getAssessmentProgressDetails():Observable<any>{
    return this.http.get(this.assessmentProgressURL);
  }

  getStudentAttendanceDetails(){
    return this.http.get(this.studentAttendanceURL);
  }
}
