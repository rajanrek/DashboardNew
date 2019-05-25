import { Component, OnInit } from '@angular/core';
import {SurveyListService} from "../surveys/surveys.services";
import * as L from "leaflet";
import 'leaflet-measure';
import 'leaflet-draw';
import 'leaflet.sync';
//import * as T from 'SpatialServer/Leaflet.MapboxVectorTile';
//import moment from "moment";
import { WorkspaceBase } from "./workspace-base.component";
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
//https://embed.plnkr.co/wcIR3Aehrpo8c54fZOpd/
@Component({
  selector: 'workspace-2d-compare',
  templateUrl: './workspace-2d-compare.component.html',
  styleUrls: ['./workspace-2d-compare.component.scss']
})
export class Workspace2dCompareComponent extends WorkspaceBase implements OnInit {
  isWaiting = false;
  isLoaded = false;
  public Ortholyr2
  public Ortholyr1
  public streetMap
  public satelliteMap
  public streetMap1
  public streetMap2
  public uploadItem
  public uploadItem2
  public s3BucketUrl
  public orthoLayerUrl
  public orthoLayerUrl2
  public defaultZoomLevel
  public map1
  public map2
  public orthoSettings;
  public orthoSettings2;
  public surveyName1;
  public surveyName2;
  public rightSurvey;
  public leftSurvey;
  projectSurveys: any=[];
  constructor(public surveyService: SurveyListService, private activeRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    super(surveyService);
    this.isWaiting = false;
    this.isLoaded = false;
    this.gufi = undefined;
    this.Ortholyr1 = undefined;
    this.Ortholyr2 = undefined;
    this.streetMap = undefined;
    this.uploadItem = undefined;
    this.s3BucketUrl = environment['s3BucketUrl'];
    this.defaultZoomLevel = 12;
  }
  ngOnInit() {
    this.spinner.show();
    const queryParams = this.activeRoute.snapshot.queryParams
    const routeParams = this.activeRoute.snapshot.params;
    this.gufi = routeParams.id;
    // do something with the parameters
    super.activate(this.gufi);
  }
  Init() {
    var refreshIntervalId = setInterval(() => {
      if (this.isLoaded) {
        clearInterval(refreshIntervalId);
        return;
      }

          this.renderMap1(this.surveyInfo);
          this.surveyService.getSurveysById(this.surveyProjectId).subscribe((data => {
          this.projectSurveys = data;
          this.leftSurvey = this.projectSurveys.Flights.find(x => x.Gufi === this.surveyInfo.Mission.Gufi);
                
          if (this.projectSurveys.Flights.length == 1) {           
            this.renderMap2(this.surveyInfo);
            this.rightSurvey = this.leftSurvey;            
          }
          else if (this.projectSurveys.Flights.length == 2)
          {            
              this.projectSurveys.Flights.map(eachsurvey => {
                if (eachsurvey.Gufi != this.surveyInfo.Mission.Gufi) {
                  this.rightSurvey = eachsurvey;
                  this.surveyService.getSurveyOutputs(eachsurvey.Gufi).subscribe(survey2 => {
                    this.renderMap2(survey2);
                  });
              }
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

            var rightindex = 0;

            this.projectSurveys.Flights.map((survey, index) => {              
              if (survey.Gufi == this.gufi && this.projectSurveys.Flights.length == (index + 1)) {
                rightindex = index - 1;
              }
              else if (survey.Gufi == this.gufi && this.projectSurveys.Flights.length != (index + 1)) {
                rightindex = index + 1
              }
            })

            this.surveyService.getSurveyOutputs(this.projectSurveys.Flights[rightindex].Gufi).subscribe(survey2 => {
              this.renderMap2(survey2);
              this.rightSurvey = this.projectSurveys.Flights[rightindex]
            })

          }
        }))
        this.isLoaded = true;
      //}
      //else {
      //  this.spinner.hide();
       
      //}
    }, 2);
   
  }
  renderMap1(surveyInfo) {
    if (this.map1) {
      this.map1.remove();
    }
    this.uploadItem = surveyInfo.Uploads.find(x => x.TypeName == 'Tiles');
    if (this.uploadItem) {
      this.surveyName1 = surveyInfo.Mission.Name
      this.orthoLayerUrl = this.s3BucketUrl + '/' + this.uploadItem.FileLocation;
      this.orthoSettings = JSON.parse(this.uploadItem.DefaultSettings);
      let accessToken = environment['mapboxAccessToken']
      this.streetMap1 = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=' + accessToken, {
        attribution: surveyInfo.Mission.Name
      });
      this.Ortholyr1 = L.tileLayer(this.orthoLayerUrl + '{z}/{x}/{y}.png', {
        tms: true,
        maxZoom: 26,
        minZoom: 14,
        opacity: 0.7,
        attribution: ""
      });
      // Map
      this.map1 = L.map('map1', {
        center: [this.orthoSettings.maxy, this.orthoSettings.maxx],
        zoom: 14,
        minZoom: 14,
        maxZoom: 22,
        layers: [this.streetMap1, this.Ortholyr1],
      });

      this.map1.zoomControl.setPosition('topright');
      // Add base layers
      //this.spinner.hide();
      var orthoSettings = JSON.parse(this.uploadItem.DefaultSettings);
      console.log(">>>>>>>>>>>>>>>>>.orthoSettings", orthoSettings)
         if (orthoSettings != null) {
           //this.spinner.hide();
        this.map1.fitBounds([[orthoSettings.maxy, orthoSettings.maxx], [orthoSettings.miny, orthoSettings.minx]]);
      }
    }
    else {
      console.log(">>>>>>>>>>Mission1 ortho not uploaded")
    }
  }
  renderMap2(survey2) {
    if (this.map2) {
      this.map2.remove();
    }
    this.spinner.show();
    this.uploadItem2 = survey2.Uploads.find(x => x.TypeName == 'Tiles');
    if (this.uploadItem2) {
      this.surveyName2 = survey2.Mission.Name
      this.orthoLayerUrl2 = this.s3BucketUrl + '/' + this.uploadItem2.FileLocation;
      this.orthoSettings2 = JSON.parse(this.uploadItem2.DefaultSettings);
      let accessToken = environment['mapboxAccessToken']
      this.streetMap2 = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=' + accessToken, {
        attribution: survey2.Mission.Name
      });
      this.Ortholyr2 = L.tileLayer(this.orthoLayerUrl2 + '{z}/{x}/{y}.png', {
        tms: true,
        maxZoom: 26,
        minZoom: 14,
        opacity: 0.7,
        attribution: ""
      });
      // Overlay layers (TMS)
      //L.Icon.Default.imagePath = 'styles/images';
      // Map
      //var center = [59.336, 5.967];
      this.map2 = L.map('map2', {
        center: [this.orthoSettings2.maxy, this.orthoSettings2.maxx],
        zoom: 14,
        minZoom: 14,
        maxZoom: 22,
        layers: [this.streetMap2, this.Ortholyr2],
      });

      this.map2.zoomControl.setPosition('topright');
      // Add base layers
      //this.spinner.hide();
      var orthoSettings2 = JSON.parse(this.uploadItem2.DefaultSettings);
      if (orthoSettings2 != null) {
        this.spinner.hide();
        this.map2.fitBounds([[orthoSettings2.maxy, orthoSettings2.maxx], [orthoSettings2.miny, orthoSettings2.minx]]);
      }
      this.map1.sync(this.map2);
      this.map2.sync(this.map1);
    }
      else {
        console.log(">>>>>>>>>>Mission2 ortho not uploaded")
      }
    this.spinner.hide();
  }
  recieveCompareData(data) {
    this.spinner.show();
    this.surveyService.getSurveyOutputs(data.Survey1.Gufi).subscribe(survey1 => {
      this.renderMap1(survey1);
    })
    this.surveyService.getSurveyOutputs(data.Survey2.Gufi).subscribe(survey2 => {
      this.renderMap2(survey2);
    })
  }
}
