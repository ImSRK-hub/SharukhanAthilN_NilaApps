import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  private selectedCourseDetailsURL = "selected-course-details.json";

  getselectedCourseDetailsURL():Observable<any>{
    return this.http.get(this.selectedCourseDetailsURL)
  }
}
