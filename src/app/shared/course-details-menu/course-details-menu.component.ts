interface courseDetailsInt{
      "courseCode": string,
      "courseName": string,
      "courseType": string,
      "coursePeriod": string,
      "credits": {
        "lecture": number,
        "tutorial": number,
        "practical": number,
        "project": number
      },
      "courseOutcomes": string[],
      "MappedToThisCourse": string[]
}



import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-course-details-menu',
  templateUrl: './course-details-menu.component.html',
  styleUrl: './course-details-menu.component.css'
})
export class CourseDetailsMenuComponent implements OnInit{

  @Input() selectedCourseCode?: string;

  courseDetails:courseDetailsInt|null = null;



  constructor(private sharedService : SharedService){}
  ngOnInit(): void {
    this.fetchSelectedCourseDetails();
  }

  fetchSelectedCourseDetails(){
    this.sharedService.getCourseDetails().subscribe(data => {
      let completeCourseDetails = data.courseDetails;
      for(let course of completeCourseDetails){
        if(course['courseCode'] == this.selectedCourseCode){
          this.courseDetails = course;
          console.log("course details >>>>>",this.courseDetails);
          break;
        }
      }
    });
  }

  addCredits():number{
    if(this.courseDetails != null){
      return (
        this.courseDetails['credits']['lecture'] 
        + this.courseDetails['credits']['tutorial'] 
        + this.courseDetails['credits']['practical'] 
        + this.courseDetails['credits']['project']);
    }
    return 0;
  }

}
