
import { Component, OnInit } from '@angular/core';
//@autoinject
@Component({
  selector: 'workspace-component',

})
export class WorkspaceBase {
  public gufi
  public missionGeometries
  public missionUploads
  public surveyService
  public processStatus
  public missionStatusMessage
  public projectId
  public mission
  public MissionGeometries
  public processTask
  public isWaiting
  public surveyUploads
  public surveyOutput
  public surveyProjectId
  public surveyInfo
  public orgFeatureList
  public popupData;
  constructor(surveyService) {    
    this.gufi = null;
    this.missionGeometries = null;
    this.missionUploads = null;
    this.surveyService = surveyService;    
    this.processStatus = -1; //#ToDo- Need better way to handle it.
    this.missionStatusMessage = 'Not Queued Yet';
    this.projectId = null;
    this.orgFeatureList = null;
  }

  get MissionName() {
    return this.mission ? this.mission.Name : '';
  }

  OrganizationFeatures() {
    return this.orgFeatureList ? this.orgFeatureList : null;
  }

  GetMissionName() {
    return this.mission ? this.mission.Name : '';
  }


  get ProjectName() {
    return this.mission ? this.mission.ProjectName : null;
  }

  get ProjectId() {
    return this.mission ? this.mission.ProjectId : null;
  }
  
  get IsQueuedFor3DProcessing() {
    return this.processTask && this.processTask.ThreedTaskId !== 0;
  }

  get Is3DTaskProcessed() {
    return this.processTask && this.processTask.TaskStatus === 3;
  }

  activate(missionId) {
    console.log('workspace-base::activate');
    this.gufi = missionId;
    this.Initialize();
  }

  Initialize() {
    console.log('workspace-base::Initialize');
    this.isWaiting = true;
    let actions = [];
    actions.push(this.surveyService.getSurveyOutputs(this.gufi));

    Promise.all(actions)
      .then(results => {
        this.surveyOutput = results[0];
        this.surveyOutput.subscribe((data) => {
          console.log(">>>>>>datadatadata", data)

          this.surveyInfo = data;
          
          this.mission = data.Mission;       
          this.missionGeometries = data.MissionGeometries;               
          this.processTask = data.ThreedTask;
          this.surveyUploads = data.Uploads;
          this.surveyProjectId = data.Mission.ProjectId;
          this.isWaiting = false;
          this.orgFeatureList = data.OrganizationItem.SelectedSurveyOutputs;          
          this.Init();
        })

      })
      .catch(e =>       
        console.log("Error is ", e)
      )    
    
  }
  Init() {
    ///NOTE: Do not delete it
    console.log('workspace-base::Init');
   
  }
}
