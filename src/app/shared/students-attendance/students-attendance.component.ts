import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-students-attendance',
  templateUrl: './students-attendance.component.html',
  styleUrl: './students-attendance.component.css'
})
export class StudentsAttendanceComponent implements OnInit {
  @Input() selectedCourseCode?: string;
  chart: any;
  studentAttendanceDetails:any = [];

  constructor(private sharedService:SharedService){}


  ngOnInit(): void {
      this.fetchStudentAttendanceDetails();
  }

  fetchStudentAttendanceDetails(){
    this.sharedService.getStudentAttendanceDetails().subscribe(data=> {
      let completeDetails = data['studentAttendance'];
      for(let StuAttDet of completeDetails){
        if(StuAttDet['courseCode'] == this.selectedCourseCode){
          this.studentAttendanceDetails = StuAttDet;
          break;
        }
      }
      this.createChart();
    });
  }

  createChart(): void {
    const ctx = document.getElementById('studentAttendanceChart') as HTMLCanvasElement;
    const labels = this.studentAttendanceDetails.labels.map(data => `${data.split('/')[0]}/${data.split('/')[1]}`);
    labels.unshift(null);
    console.log("labels",labels);
    const data = this.studentAttendanceDetails.data;
    data.unshift(null);
    console.log(data)
    const datasets = [{
      data: data,
      fill: false,
      borderColor: 'rgb(165, 76, 209, 1)',
      backgroundColor: 'black',
      tension: 0.1,
      pointRadius: 3,
      pointHoverRadius: 3
    }]
    
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: true // Hide vertical grid lines
            }
          },
          y: {
            beginAtZero: true,
            max: 100,  // Set the maximum Y-axis value to 100
            ticks: {
              stepSize: 25,  // Set the interval to 25
              callback: (value) => `${value}%`,  // Add "%" to Y-axis tick labels
              autoSkip: false  // Ensure all specified ticks (0%, 25%, 50%, 75%, 100%) are displayed
            },
            grid: {
              display: false // Vertical grid lines are still displayed for the Y-axis
            }
          }
        },
        plugins: {
          tooltip: {
          enabled:false
          },
          legend: {
            display: false,
          }
        },
        
      },
    }
    )
}
}
