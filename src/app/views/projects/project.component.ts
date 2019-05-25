import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import {  ActivatedRoute, Params } from "@angular/router"; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  public id:any;
  public project;

  constructor(private access: ProjectsService, private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
  console.log('projects::constructor')
  
    this.activatedRoute.params.subscribe((params: Params) => {
    this.id=params.id;
      

 })     
}

ngOnInit() {
  
  if(this.id==0){
    this.NewDetails();
   }
   else{
   this.EditDetails()
   }
   
   
  }

NewDetails(){
  this.access.getNewProject()
  .subscribe((data => {
    this.project = data;
  }))
}

EditDetails(){
  this.access.getProject(this.id).subscribe((data => {
    this.project = data;     
    console.log(this.project)
 
  }))
}


}
