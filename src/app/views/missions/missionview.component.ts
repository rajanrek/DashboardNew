import { Component, OnInit } from '@angular/core';
import { MissionsService } from './missions.service';
import {  ActivatedRoute, Params } from "@angular/router";  
import { Router } from '@angular/router';
@Component({
  selector: 'app-missionview',
  templateUrl: './missionview.component.html',
})
export class MissionviewComponent implements OnInit {
  public id;
  public missionview;
  constructor(private access: MissionsService, public router: Router, private activatedRoute: ActivatedRoute) { 
      
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params)
      this.id=params.id;
   })

   this.access.getMissionByProjId(this.id).subscribe((data => {
    this.missionview = data;    
     console.log("checking missions", this.missionview);
  }))
  }

  ngOnInit() {
  }
  
}
