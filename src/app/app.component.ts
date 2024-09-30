import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'nilaApps-Demo-Project';

  selectedCourseDetails : any = null;
  selectedCourseID:any = null;

  constructor(private commonService: CommonService){}

  ngOnInit(): void {
      this.commonService.getselectedCourseDetailsURL().subscribe(data => {
        this.selectedCourseDetails = data['courseDetails'];
        this.selectedCourseID = this.selectedCourseDetails.courseCode;
      });
  }
}
