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
import { WorkspaceComponent } from './workspace.component';
import { NgxSpinnerService } from 'ngx-spinner';
//import { EventAggregator } from "aurelia-event-aggregator";
declare const Sketchfab: any;
//@inject(EventAggregator, QueueService, MissionService, Router, SurveyService)
@Component({
  selector: 'workspace-3d-compare',
  templateUrl: './workspace-3d-compare.component.html',

})
export class Workspace3dCompareComponent extends WorkspaceBase implements OnInit {
  isWaiting = false;
  isLoaded = false;
  public processTask
  public isQueuedFor3DProcessing
  projectSurveys: any = [];
  public rightSurvey;
  public leftSurvey;
  constructor(public surveyService: SurveyListService, private activeRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    super(surveyService);
    this.isWaiting = false;
    this.isLoaded = false;
  }
  ngOnInit() {
    this.spinner.show();
    //const queryParams = this.activeRoute.snapshot.queryParams
    const routeParams = this.activeRoute.snapshot.params;
    // do something with the parameters
    super.activate(routeParams.id);
  }
  Init() {
    this.isWaiting = true;
    var refreshIntervalId = setInterval(() => {
      if (this.isLoaded) {
        clearInterval(refreshIntervalId);
        return;
      }
      //Load 3D if data available
      if (this.processTask != null) {
        this.isQueuedFor3DProcessing = this.processTask.ThreedTaskId == 0 ? false : true;
        if (this.processTask.ModelId != null) {
          this.init3DViewer(this.processTask.ModelId);
          this.surveyService.getSurveysById(this.surveyProjectId).subscribe((data => {
            this.projectSurveys = data;
            this.projectSurveys.Flights.map(eachsurvey => {
              if (eachsurvey.MissionId == this.surveyInfo.Mission.MissionId) {
                this.leftSurvey = eachsurvey;
              }
            })

            if (this.projectSurveys.Flights.length == 1) {
              this.surveyService.getSurveyOutputs(this.projectSurveys.Flights[0].Gufi).subscribe(data => {
                this.init3DViewer2(data.ThreedTask.ModelId);
                this.projectSurveys.Flights.map(eachsurvey => {
                  if (eachsurvey.MissionId == data.Mission.MissionId) {
                    this.rightSurvey = eachsurvey;
                  }

                })
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
                      this.init3DViewer2(data.ThreedTask.ModelId);
                      this.rightSurvey = this.projectSurveys.Flights[index - 1]
                    })
                  }
                     // if the comparison gufi is not at last idex so compare it with next  one.
                  else {
                    this.spinner.hide();
                    this.surveyService.getSurveyOutputs(this.projectSurveys.Flights[index + 1].Gufi).subscribe(data => {
                      this.init3DViewer2(data.ThreedTask.ModelId);
                      this.rightSurvey = this.projectSurveys.Flights[index + 1]
                    })
                  }
                }
              })
            }
          }))


          //this.init3DViewer2(this.processTask.ModelId);
        }
        else {
          console.log(">>>>>>>>>>>Data not uploades yet!");
          this.spinner.hide();
        }
        this.isLoaded = true;
        this.isWaiting = false;

      }
    }, 2);
  }
  init3DViewer(modelId) {
    console.log(">>>>>>>>>>>>>>>.i am called")
    var iframe = document.getElementById('3dViewer');
    var version = '1.0.0';
    var viewerModelId = modelId;
    var client = new Sketchfab(version, iframe);
    var self = this;
    client.init(viewerModelId, {
      success: function onSuccess(api) {
        self.spinner.hide();
        api.start();
        api.addEventListener('viewerready', function () {
          //API is ready to use
          console.log('Viewer is ready');
        });
      },
      error: function onError() {
        console.log('Viewer error');
        self.spinner.hide();
      },
      autostart: 1,
      autospin: 0,
      preload: 1,
      ui_stop: 0,
      transparent: 0,
      ui_controls: 0,
      ui_general_control: 0,
      ui_help: 0,
      //navigation:'fps',
      ui_infos: 0,
      background: { "color": "#ffffff" }
    });
  }

  init3DViewer2(modelId) {
    var iframe = document.getElementById('3dViewer2');
    var version = '1.0.0';
    var viewerModelId = modelId;
    var client = new Sketchfab(version, iframe);
    var self = this;
    client.init(viewerModelId, {
      success: function onSuccess(api) {
        self.spinner.hide();
        api.start();
        api.addEventListener('viewerready', function () {
          //API is ready to use
          console.log('Viewer2 is ready');
        });
      },
      error: function onError() {
        console.log('Viewer error');
        self.spinner.hide();
      },
      autostart: 1,
      autospin: 0,
      preload: 1,
      ui_stop: 0,
      transparent: 0,
      ui_controls: 0,
      ui_general_control: 0,
      ui_help: 0,
      //navigation:'fps',
      ui_infos: 0,
      background: { "color": "#ffffff" }
    });
  }
  recieveCompareData(data) {
    this.spinner.show();
    this.surveyService.getSurveyOutputs(data.Survey1.Gufi).subscribe(survey1 => {
      this.init3DViewer(survey1.ThreedTask.ModelId);
    })
    this.surveyService.getSurveyOutputs(data.Survey2.Gufi).subscribe(survey2 => {
      this.init3DViewer2(survey2.ThreedTask.ModelId);
    })
  }
}
