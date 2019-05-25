import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ProjectListService
} from './project.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-table-list',
  templateUrl: './project.component.html',
  //styleUrls: ['./project-list.component.scss']
})
export class ProjectComponent implements OnInit {
  projectslist: any;
  constructor(private router: Router, private projectService: ProjectListService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getProjects()
  }
  surveyView(project) {
    //this.router.navigate(['/', 'surveys/' + project.ProjectId]);
    this.router.navigate(['/surveys', project.ProjectId])
  }
  getProjects() {
    this.spinner.show();
    this.projectService.getProjects().subscribe((res) => {
      this.spinner.hide();
      this.projectslist = res;
      //sort by latest projects.
      this.projectslist.sort(function (a, b) {
        //Turn your strings into dates, and then subtract them
        //to get a value that is either negative, positive, or zero.
        {
          return new Date(b.DateCreated).getTime() - new
            Date(a.DateCreated).getTime()
        }
      })
    }, (err) => {
      console.log(err);
    });
  }
}
