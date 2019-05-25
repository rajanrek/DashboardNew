import * as $ from 'jquery';
declare var ol: any;
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';  
import { Component, OnInit, NgZone } from '@angular/core';
import {
  SurveyListService
} from "../surveys/surveys.services";
import { WorkspaceBase } from "./workspace-base.component";
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MediaService } from "../../services/media.service";
import { AnnotationService } from "../../services/annotation.service";
import { UtilityService } from "../../services/utility.service";
import { WorkspaceSidebarComponent } from './workspace-sidebar.component';
import { Router } from '@angular/router';
import { MissionService } from "../../services/mission.service";
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'workspace-inspection-report',
  templateUrl: './workspace-inspection-report.component.html',
  styleUrls: ['./workspace-inspection-report.component.scss']

})
export class WorkspaceInspectionReportComponent extends WorkspaceBase implements OnInit {
  map: any;
  ol: any;
  flickrSource: any;
  lat: any;
  lng: any;
  initialIndex = 0
  isWaiting = false;
  isLoaded = false;
  loadcomplete: boolean = false;
  completed = '';
  mapImages: Array<any>;
  generateReport: boolean = false;
  garudaLogo: boolean = false;
  userName: string = "";
  loginEmail: string = "";
  date: any;
  images: any;
  LowSevCount: number = 0;
  MediumSevCount: number = 0;
  HighSevCount: number = 0;
  InfoCount: number = 0;
  annotationOverViewData: Array<any>;
  medialist: any;
  missionName: string = "";
  userDefinedTag: Array<any>;
  allTags: any;
  anotationListing: Array<any>;
  filterData: any;
  target: any;
  public geometryStyle;
  annotationGeometry: Array<any>;
  source: any;
  vector: any;
  extent: any;
  projection: any;
  url: any;
  ImageLayer: any;
  view: any;
  select: any;
  map2: any;
  CloudCover: any;
  Humidity: any;
  Temperature: any;
  WindSpeed: any;
  ClientName: string = "";
  droneName: string = "";
  batteryName: string = "";
  oranizationName: string = "";
  pilotName: string = "";
  Location: any;
  InspectionType: any;
  logo: any;

  constructor(private zone: NgZone, public surveyService: SurveyListService, private activeRoute: ActivatedRoute, public mediaService: MediaService, public annotationService: AnnotationService, public utilityService: UtilityService, private router: Router, public missionService: MissionService, private spinner: NgxSpinnerService) {
    super(surveyService);
    this.lng = '-77.549752';
    this.lat = '38.926047';
  }
  activate(params) {
    this.gufi = params.id
    //super.activate(params.id);
  }
  ngOnInit() {
    this.spinner.show();
    const queryParams = this.activeRoute.snapshot.queryParams
    const routeParams = this.activeRoute.snapshot.params;
    this.gufi = routeParams.id;
    this.userName = localStorage["UserName"]
    this.loginEmail = localStorage["email"]
    //this.getMission()
    this.getTags()
    this.getAnnotationType();
    this.initMap();
    this.getMediaList()
    this.date = "22/09/2018"


    var scope = this;
    var updateMap2Images = setInterval(() => {
      if (scope.images && scope.images.length > 0) {
        this.getData(this.initialIndex)
        clearInterval(updateMap2Images);
      }
    }, 1000)

  }

  getData(index) {
    if (this.images[index] != null) {

      this.getAnnotations(this.images[index], index)
    }
    else {
      this.loadcomplete = true;
      this.spinner.hide();
    }


  }
  getMediaList() {
    this.isWaiting = true;
    this.mediaService.getMediaList(this.gufi)
      .subscribe(results => {
        if (results != null && results.MediaFileGroup[0] != null && results.MediaFileGroup[0].MediaFileItemList != null) {
          this.LowSevCount = 0
          this.MediumSevCount = 0
          this.HighSevCount = 0
          this.InfoCount = 0
          this.images = [];
          this.annotationOverViewData = [];
          this.medialist = results.MediaFileGroup[0];
          if (this.medialist) {
            this.missionName = this.medialist.MissionName;
            this.medialist.MediaFileItemList.filter(x => x.TypeName == 'Picture').map((x, index) => {
              //making array of all Severity related to mission !!!!! 
              x.Annotations.map((severityData) => {
                // Finding count for each severity on image
                if (severityData.Severity == 'Low') {
                  this.LowSevCount = this.LowSevCount + 1;
                  this.InfoCount = this.InfoCount + 1;
                }
                else if (severityData.Severity == 'Medium') {
                  this.MediumSevCount = this.MediumSevCount + 1;
                  this.InfoCount = this.InfoCount + 1;
                }
                else if (severityData.Severity == 'High') {
                  this.HighSevCount = this.HighSevCount + 1;
                  this.InfoCount = this.InfoCount + 1;
                }
              })
              //worked only the images that have annotations
              if (x.Annotations.length > 0) {
                //getting file name from url
                x.name = this.utilityService.getFileName(x.FileLocation);
                let metaData = JSON.parse(x.MetaData);
                x.metaData = metaData;
                if (metaData.Latitude && metaData.Longitude) {
                  // creating feati=ure for map 1 cluster
                  let pic = {
                    //i: this.mapImages.length,
                    //MissionId: this.mission.MissionId,
                    //Gufi: this.mission.Gufi,
                    gufi: this.gufi,
                    lat: metaData.Latitude,
                    lng: metaData.Longitude,
                    thumbnail: x.ThumbnailFileLocation,
                    url: x.MidSizeImgLocation,
                    MediaFileId: x.MediaFileId
                  }

                  if (pic.lat != 0 && pic.lng != 0) {
                    var transform = ol.proj.getTransform('EPSG:4326', 'EPSG:3857');
                    var feature = new ol.Feature(pic);
                    var coordinate = transform([parseFloat(pic.lng), parseFloat(pic.lat)]);
                    var geometry = new ol.geom.Point(coordinate);
                    feature.set('url', pic.url);
                    feature.setGeometry(geometry);
                    this.flickrSource.addFeature(feature);
                    //this.mapImages.push(pic);
                    this.map.setView(new ol.View({
                      center: coordinate,
                      zoom: 16
                    }));
                  }

                }
                //filtering user defined tag based on media file id
                this.userDefinedTag = []
                this.allTags.filter(tag => {
                  if (tag.MediaFileId == x.MediaFileId) {
                    this.userDefinedTag.push(tag)
                  }
                })
                x.userDefinedTag = this.userDefinedTag;
                // get annotation type name based on id
                this.anotationListing.map((annotationTypedata) => {
                  x.Annotations.map((annotation) => {
                    //this.AnnotationTypeFilterData.push(annotation.TypeId);
                    if (annotationTypedata.AnnotationTypeId == annotation.TypeId) {
                      annotation.annoTypeName = annotationTypedata.Name;
                      this.annotationOverViewData.push(annotation)
                    }

                  })
                })
                this.images.push(x);

                this.generateReport = false;
                this.medialist.totalLowCount = this.LowSevCount;
                this.medialist.totalMediumCount = this.MediumSevCount;
                this.medialist.totalHighCount = this.HighSevCount;
                this.medialist.totalAnotation = this.LowSevCount + this.HighSevCount + this.MediumSevCount
                this.medialist.totalInfoCount = this.InfoCount

              }

            })
            if (this.images.length == 0) {
              //this.notification.info(
              //  'Please Annotate Image to Generate Report!'
              //);
              alert("Please Annotate Image to Generate Report!")
              this.isWaiting = false;
              this.router.navigate(['/workspace/inspection/' + this.gufi])
            }
          }
        }
        // spliting annotation array into subarray of 10 element each to make pages on ui equals to subarray length
        this.splitIntoSubArray(this.annotationOverViewData, 10)
      }, error => {
        console.log(">>>>>>>>>>>>>>>error is", error);
      }, () => {
        this.isWaiting = false;
        this.isLoaded = true;
      })
  }
  //function to split array into sub arrays
  splitIntoSubArray(arr, count) {
    var newArray = [];
    while (arr.length > 0) {
      newArray.push(arr.splice(0, count));
    }
    this.filterData = newArray;
  }
  initMap2(item, index) {
    this.target = "map" + index
    //this.annotationGeometry = {}
    var scope = this;
    //var image = new ol.style.Circle({
    //  radius: 10,
    //  fill: null,
    //  stroke: new ol.style.Stroke({ color: 'red', width: 1 })
    //});
    this.geometryStyle = function (feature, resolution) {
      var color = feature.color;
      if (color == undefined) {
        color = '#31c5ac';
      }
      return [new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: color,
          width: 2
        }),
        fill: new ol.style.Fill({
          color: 'rgba(0, 0, 255, 0.1)'
        }),
        text: new ol.style.Text({
          font: '20px Calibri,sans-serif',
          fill: new ol.style.Fill({ color: 'white' }),
          //stroke: new ol.style.Stroke({color: 'white', width: 1}),
          overflow: true,
          //backgroundFill: new ol.style.Fill({ color: feature.color }),
          placement: "point",
          textBaseline: "middle",
          text: feature.comment.toString()
        })
      })
      ];
    };
    if (Object.getOwnPropertyNames(this.annotationGeometry).length !== 0) {
      this.source = new ol.source.Vector({
        wrapX: false,
        features: this.annotationGeometry
      });
    }
    else {
      this.source = new ol.source.Vector({
      });
    }
    //Provides a source of features for vector layers
    //to create a shape we need vector layer
    this.vector = new ol.layer.Vector({
      source: this.source,
      style: this.geometryStyle
    });
    this.extent = [0, 0, 1024, 968];
    this.projection = new ol.proj.Projection({
      extent: this.extent
    });
    this.url = item.FileLocation + '?x=' + new Date().getTime();
    //this.url = this.url.replace(/^https:\/\//i, 'http://');
    //creating static image layer by giving dynamic url.
    var imageSource = new ol.source.ImageStatic({
      url: this.url,
      projection: this.projection,
      imageExtent: this.extent,
      crossOrigin: 'anonymous',
    })
    this.ImageLayer = new ol.layer.Image({
      source: imageSource,

    })
    this.view = new ol.View({
      projection: this.projection,
      center: ol.extent.getCenter(this.extent),
      //zoom:2
      resolution: 1,        // important for 100% image size!
      maxResolution: 4
    })

    this.map2 = new ol.Map({
      layers: [this.ImageLayer, this.vector],
      target: this.target,
      view: this.view
    });
    //setTimeout(() => {
    var scope = this
    this.map2.once('postcompose', function (event) {
      const canvas = event.context.canvas;
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
      } else {
        setTimeout(() => {
          var dataURL = canvas.toDataURL('image/jpeg', 1.0)
          $("#map" + index + "").addClass("mapDisplay");
          $("#abc" + index + "").html("<img src=" + dataURL + " style='width:100%'>");
          scope.getData(index + 1)
        }, 7000)

      }
      //}, 2000);

    })

  }
  getAnnotations(x, index) {
    this.annotationGeometry = []
    var format = new ol.format.GeoJSON()
    this.annotationService.get2DAnnotations(x.MediaFileId)
      .subscribe(result => {
        for (var i = 0; i < result.Annotations.length; i++) {
          var fea = format.readFeature(result.Annotations[i].Geometry);
          this.annotationGeometry.push(fea);
          this.annotationGeometry[i].comment = result.Annotations[i].AnnotationId
          if (result.Annotations[i].Severity == "Low") {
            this.annotationGeometry[i].color = "rgb(193	39	45)"
          }
          else if (result.Annotations[i].Severity == "Medium") {
            this.annotationGeometry[i].color = "rgba(204,204,0,1.00)"
          }
          else if (result.Annotations[i].Severity == "High") {
            this.annotationGeometry[i].color = "rgba(193, 39, 45, 1.00)"
          }
        }
        //this.geojsonObject = {}
        this.initMap2(x, index)

      });
  }
  //get all user defined tag of mission
  getTags() {
    this.annotationService.getTags()
      .subscribe(result => {
        this.allTags = result
      })
  }
  detached() {
  }
  getAnnotationType() {
    this.annotationService.getMissionAnnotationsType()
      .subscribe(result => {
        this.anotationListing = result
      })
  }
  getMission() {
    this.isWaiting = true;
    this.missionService.getMission(this.gufi)
      .subscribe(result => {
        console.log(">>>>>>>>>>>>>>>>.resultresultresultresultresultresult is", result)
        //this.inspectionCreatedDate == moment(result.Mission.DateCreated).format('YYYY-MM-DD')
        result.Projects.map((project) => {
          if (project.ProjectId == result.Mission.ProjectId) {
            if (project.Client && project.Client != null) {
              this.ClientName = project.Client.Name
            }
          }
        })
        result.Pilots.map((pilot) => {
          if (pilot.Id == result.Mission.PilotId) {
            this.pilotName = pilot.FullName
          }
        })
        result.Drones.map((drone) => {
          if (drone.DroneId == result.Mission.DroneId) {
            this.droneName = drone.Title
          }
        })
        result.Batteries.map((battery) => {
          if (battery.BatteryId == result.Mission.BatteryId) {
            this.batteryName = battery.BatteryName
          }
        })
        result.Locations.map((location) => {
          if (location.LocationId == result.Mission.LocationId) {
            this.Location = location.Name
          }
        })
        result.FlightTypes.map((flight) => {
          if (flight.FlightTypeId == result.Mission.FlightTypeId) {
            this.InspectionType = flight.Name
          }
        })
        result.OrganizationLookup.map((organization, index) => {
          if (organization.OrganizationId == result.Mission.OrganizationId) {
            this.logo = result.OrganizationLookup[index].LogoFile
            this.oranizationName = organization.Name
          }
          if (this.logo == null) {
            this.garudaLogo = true;
          }
          else {
            this.garudaLogo = false;
          }
        })

        if (result.Weather !== null) {
          this.CloudCover = result.Weather.CloudCover
          this.Humidity = result.Weather.Humidity
          this.Temperature = result.Weather.Temperature
          this.WindSpeed = result.Weather.WindSpeed
        }
        //result.FlightTypes.map((flight) => {
        //  if (flight.FlightTypeId == result.Mission.FlightTypeId) {
        //    this.equipmentName = equipment.Name
        //  }
        //})
      });
  }
  //function to load map with cluster
  initMap() {
   
    var scope = this;
    //if (this.map) {
    //  this.map.remove();
    //}
    let accessToken = environment['mapboxAccessToken']

    this.flickrSource = new ol.source.Vector({
    });
    var clusterSource = new ol.source.Cluster({
      source: this.flickrSource,
      distance: 20,
    });
    var styleCache = {};
    var flickrLayer = new ol.layer.Vector({
      source: clusterSource,
      style: function (feature) {
        var size = feature.get('features').length;
        var style = styleCache[size];
        if (!style) {
          style = new ol.style.Style({
            image: new ol.style.Circle({
              radius: 10,
              stroke: new ol.style.Stroke({
                color: '#fff'
              }),
              fill: new ol.style.Fill({
                color: '#36e4c6'
              })
            }),
            text: new ol.style.Text({
              text: size.toString(),
              fill: new ol.style.Fill({
                color: '#fff'
              })
            })
          });
          styleCache[size] = style;
        }
        return style;

      },
    });
    var layer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=' + accessToken,
        crossOrigin: 'anonymous',
      }),
    })
    var center = ol.proj.transform([this.lng, this.lat], 'EPSG:4326', 'EPSG:3857');
    this.map = new ol.Map({
      renderer: 'canvas',
      target: 'map',
      layers: [layer, flickrLayer],
    });

    this.map.once('postcompose', function (event) {
      var canvas = event.context.canvas;
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
      } else {
        setTimeout(() => {
          var dataURL = canvas.toDataURL('image/jpeg', 1.0)
          $("#map").html("<img src=" + dataURL + " style='width:100%'>");
        }, 1000)
      }
    });


  }
  async generateAllPdf() {
    const doc = new jspdf('p', 'mm', 'a4');
    const options = {
      pagesplit: true
    };
    const ids = $('.bgrnd')
    const length = ids.length;
    for (let i = 0; i < length; i++) {
      const chart = $('.bgrnd')[i]
      // excute this function then exit loop
      await html2canvas(chart).then(function (canvas) {
        var imgWidth = 208;
        var pageHeight = 215;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        var position = 0;
        doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        if (i < (length - 1)) {
          doc.addPage();
        }
      });
    }
    // download the pdf with all charts
    doc.save('inspection_report' + Date.now() + '.pdf');
  }
}
