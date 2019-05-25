//import { bindable, inject } from "aurelia-framework";
//import { Router } from "aurelia-router";
//import { QueueService } from "queue/queueService";
//import { MissionService } from "missions/missionService";
import { Component, OnInit } from '@angular/core';
import {
  SurveyListService
} from "../surveys/surveys.services";
import { WorkspaceBase } from "./workspace-base.component";
import { ActivatedRoute } from '@angular/router';
// import { WorkspaceComponent } from './workspace.component';
import { NgxSpinnerService } from 'ngx-spinner';
//import { EventAggregator } from "aurelia-event-aggregator";
declare const Sketchfab: any;
//@inject(EventAggregator, QueueService, MissionService, Router, SurveyService)
@Component({
  selector: 'workspace-image-compare',
  templateUrl: './workspace-imagecompare.component.html',

})
export class WorkspaceImageCompareComponent extends WorkspaceBase implements OnInit {
  isWaiting = false;
  isLoaded = false;
  public processTask
  public isQueuedFor3DProcessing
  projectSurveys: any = [];
  tags: any = [];
  constructor(public surveyService: SurveyListService, private activeRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    super(surveyService);
    this.tags = ["Bridge", "Waterbar", "Grading", "Brushing"];
    //this.isWaiting = false;
    //this.isLoaded = false;
  }
  ngOnInit() {
    this.spinner.show();
    const routeParams = this.activeRoute.snapshot.params;
    // do something with the parameters
    super.activate(routeParams.id);
  }
  Init() {
    this.isWaiting = true;
          this.surveyService.getSurveysById(this.surveyProjectId).subscribe((data => {
            this.projectSurveys = data;
            if (this.projectSurveys.Flights.length > 0) {
              this.spinner.hide();
            }
            if (this.projectSurveys.Flights.length == 1) {
              this.surveyService.getSurveyOutputs(this.projectSurveys.Flights[0].Gufi).subscribe(data => {
                //this.init3DViewer2(data.ThreedTask.ModelId);
              })
            }
            else {
              this.projectSurveys.Flights.sort(function (a, b) {
                //Turn your strings into dates, and then subtract them
                //to get a value that is either negative, positive, or zero.
                {
                  return new Date(a.DateCreated).getTime() - new
                    Date(b.DateCreated).getTime()
                }
              })
              this.projectSurveys.Flights.map((survey, index) => {

                if (survey.Gufi == this.gufi) {
                  // if the comparison gufi is at last idex so compare it with previous one.
                  if (index == this.projectSurveys.Flights.length - 1) {
                    this.surveyService.getSurveyOutputs(this.projectSurveys.Flights[index - 1].Gufi).subscribe(data => {
                      //this.init3DViewer2(data.ThreedTask.ModelId);
                    })
                  }
                  // if the comparison gufi is not at last idex so compare it with next  one.
                  else {
                    this.surveyService.getSurveyOutputs(this.projectSurveys.Flights[index + 1].Gufi).subscribe(data => {
                      //this.init3DViewer2(data.ThreedTask.ModelId);
                    })
                  }
                }
              })
            }
          }))

          //this.init3DViewer2(this.processTask.ModelId);
  }
  imageleft(modelId) {
  }

  imageright(modelId) {
  }
  //recieveCompareData(data) {
  //  this.spinner.show();
  //  this.surveyService.getSurveyOutputs(data.Survey1.Gufi).subscribe(survey1 => {
  //    this.init3DViewer(survey1.ThreedTask.ModelId);
  //  })
  //  this.surveyService.getSurveyOutputs(data.Survey2.Gufi).subscribe(survey2 => {
  //    this.init3DViewer2(survey2.ThreedTask.ModelId);
  //  })
  //}
}
