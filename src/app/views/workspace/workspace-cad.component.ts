import { SurveyListService } from "../surveys/surveys.services";
import { WorkspaceBase } from "./workspace-base.component";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cad',
  templateUrl: './workspace-cad.component.html',
  styleUrls: ['./workspace-cad.component.scss']
})
export class CadComponent extends WorkspaceBase implements OnInit {
  isWaiting = false;
  isLoaded = false;
  drawingPath = null;
  public s3BucketUrl;
  public processTask;
  public isQueuedFor3DProcessing
  constructor(public surveyService: SurveyListService, private activeRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    super(surveyService);
    this.isWaiting = false;
    this.isLoaded = false;
    this.s3BucketUrl = environment['s3BucketUrl'];
  }
  gufi: any;
  ngOnInit() {
    this.spinner.show();
    const routeParams = this.activeRoute.snapshot.params;
    this.gufi = routeParams.id;
    super.activate(routeParams.id);    
    debugger;
  }

  Init() {
    debugger;
    this.drawingPath = this.s3BucketUrl + '/mission/' + this.gufi + '/cad/' + this.MissionName + '.pdf';
  }
 
  
  
}
