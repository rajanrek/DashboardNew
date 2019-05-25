import { Component,  } from '@angular/core';
import { ProjectsService } from './projects.service';
import {  ActivatedRoute, Params } from "@angular/router";  
@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent  {
  public projects;
  public id;
  constructor(private access: ProjectsService, private activatedRoute: ActivatedRoute) {
    console.log('OrganizationView::constructor');
 
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params)
      this.id=params.id;
   })


    this.access.getProject(this.id).subscribe((data => {
      this.projects = data;
      console.log(this.projects);
    }))
   
    }


}
