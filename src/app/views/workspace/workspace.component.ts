import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { WorkspaceBase } from "./workspace-base.component";
import {SurveyListService} from "../surveys/surveys.services";


@Component({
  selector:'workspace-menubar',
  templateUrl: 'workspace.component.html',
  styleUrls	: ['./workspace.component.scss']
})
export class WorkspaceComponent extends WorkspaceBase implements OnInit {
  gufi: any;
  wasClicked = false;
  // isActive:boolean = false;
  constructor(public surveyService: SurveyListService, private router: Router, private activeRoute: ActivatedRoute, private _location: Location) {
    super(surveyService);
  }
  ngOnInit() {
      //const queryParams = this.activeRoute.snapshot.queryParams
    const routeParams = this.activeRoute.snapshot.params;
    this.gufi = routeParams.id;
    super.activate(this.gufi);
    //[class] = "mapView && map2 !==undefined ? 'mini-ol3-view':''"
  }
  //   onClick() {
//     this.wasClicked= !this.wasClicked;
// }
  isFeatureActive(id) {
    var orgFeatureIds = super.OrganizationFeatures();
      //console.log("Feature List", orgFeatureIds);
    if (orgFeatureIds != null && orgFeatureIds.some((item) => item.SurveyOutputId == id)) {
        return true;
      }
      else {
        return false;
      }
    }

    myFunction() {
      var element = document.getElementById("left_side_bar");
      element.classList.toggle("side-bar-hide");
    }
  
    //var wrspace = document.getElementById("body");
    //wrspace.classList.add("workspace");
  goBack() {
    this._location.back();
  }
  onclickDownload(){
    confirm('We will back soon in this section work is in progress');
    
  }
 

}

