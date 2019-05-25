import { Component, OnInit } from '@angular/core';
import { MissionsService } from './missions.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {  ActivatedRoute, Params } from "@angular/router";  
import { ProjectsService } from '../projects/projects.service';
@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {
  public missions;
  public id;
  public projects;
  constructor(private access: MissionsService, private spinner: NgxSpinnerService, private activatedRoute: ActivatedRoute) {
    console.log('Missions::constructor');

    this.activatedRoute.params.subscribe((params: Params) => {
      this.id=params.id;
      })  
     
  }
ngOnInit(){
  this.spinner.show();
  this.access.getMissionByProjId(this.id).subscribe((data => {
    this.spinner.hide(); 
    this.missions = data;    
     console.log("checking missions", this.missions);
  }))

}

}
