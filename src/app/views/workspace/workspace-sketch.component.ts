//import { bindable, inject } from "aurelia-framework";
//import { Router } from "aurelia-router";
//import { QueueService } from "queue/queueService";
//import { MissionService } from "missions/missionService";
import { Component, OnInit } from '@angular/core';
import {SurveyListService} from  "../surveys/surveys.services" ;
import { WorkspaceBase } from "./workspace-base.component";
import { ActivatedRoute } from '@angular/router';
// import { WorkspaceComponent } from './workspace.component';
import { NgxSpinnerService } from 'ngx-spinner';
//import { EventAggregator } from "aurelia-event-aggregator";
declare const Sketchfab: any;
//@inject(EventAggregator, QueueService, MissionService, Router, SurveyService)
@Component({
  selector: 'workspace-sketch',
  templateUrl: './workspace-sketch.component.html',
  
})
export class WorkspaceSketchComponent extends WorkspaceBase implements OnInit {
  isWaiting = false;
  isLoaded = false;
  public processTask
  public isQueuedFor3DProcessing
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
        }
        console.log(">>>>>>>>>>>>>..3d data not uploaded yet");
        this.spinner.hide();
        this.isLoaded = true;
        this.isWaiting = false;
       
      }
    }, 2);
  }
  init3DViewer(modelId) {
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

}
