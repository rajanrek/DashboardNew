
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import omnivore from 'leaflet-omnivore'
import {
  SurveyListService
} from "../surveys/surveys.services";
import * as L from "leaflet";
import 'leaflet-measure';
import 'leaflet-draw';
import { WorkspaceBase } from "./workspace-base.component";
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
//https://embed.plnkr.co/wcIR3Aehrpo8c54fZOpd/
@Component({
  selector: 'workspace-2d',
  templateUrl: './workspace-2d.component.html',
  styleUrls: ['./workspace-2d.component.scss'],
  styles: [`.leaflet-popup-content {
    
    margin: 13px 19px;
    line-height: 1.4;
    display: inline-table;
}`]

})
export class Workspace2dComponent extends WorkspaceBase implements OnInit {
  isWaiting = false;
  isLoaded = false;
  public volumedata;
  public lyr
  public streetMap
  public uploadItem
  public s3BucketUrl
  public orthoLayerUrl
  public defaultZoomLevel
  public map
  public baseMaps
  public orthoSettings;
  public surveyName;
   surveyNameNew =this.surveyName;
   show: boolean = false;
  public BuildingLayer;
  public Roadlayer;
  public drawingLayerPath = null;
  constructor(public surveyService: SurveyListService,private router: Router, private activeRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    super(surveyService);
    this.volumedata = {};
    this.isWaiting = false;
    this.isLoaded = false;
    this.gufi = undefined;
    this.lyr = undefined;
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
    // do something with the parametesrs
    super.activate(this.gufi);
  }
 

  Init() {
    var refreshIntervalId = setInterval(() => {
      if (this.isLoaded) {
        clearInterval(refreshIntervalId);
        return;
      }

      //Load map if tiles available
      var map = document.getElementById("map2d");
      if (this.processTask != null) {
        this.InitMap();
        this.isLoaded = true;
        this.surveyName = super.GetMissionName();

      }
    }, 2);
  }

  InitMap() {
    console.log('2d::InitMap');
    var map = document.getElementById("map2d");
    if (map == null) {
      return;
    }

    if (this.processTask.isOrthomosaicTilesUploaded) {
      this.uploadItem = this.surveyUploads.find(x => x.TypeName == 'Tiles');
      this.orthoLayerUrl = this.s3BucketUrl + '/' + this.uploadItem.FileLocation;
      this.orthoSettings = JSON.parse(this.uploadItem.DefaultSettings);
      this.renderMap();
    }
    else {
      console.log("Ortho tile is not uploaded");
      this.spinner.hide();
    }
  }

  renderMap() {
    if (this.map) {
      this.map.remove();
    }

    let accessToken = environment['mapboxAccessToken']
    this.streetMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=' + accessToken, {
      // attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a>'
    });

    var satelliteMap = L.tileLayer('https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=' + accessToken, {
      attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a>'
    });

    // Overlay layers (TMS)
    this.lyr = L.tileLayer(this.orthoLayerUrl + '{z}/{x}/{y}.png', {
      tms: true,
      maxZoom: 22,
      minZoom: 15,
      opacity: 0.7,
      attribution: ""
    });

    var map = L.map('map2d', {
      center: [this.orthoSettings.maxy, this.orthoSettings.maxx],
      zoom: 22,
      minZoom: 15,
      maxZoom: 22,
      layers: [this.streetMap, this.lyr]
    });

    map.zoomControl.setPosition('topright');

    this.baseMaps = {
      "Streets": this.streetMap,
      "Satellites": satelliteMap
    }

    var overlaymaps = { "Orthomosaic": this.lyr }

    if (this.processTask) {
      L.control.layers(this.baseMaps, overlaymaps, { position: 'topright' }).addTo(map);
    }
    else {

      L.control.layers(this.baseMaps, { collapsed: false }).addTo(map);
    }
    // Add base layers
    this.spinner.hide();

    //var self = this;
    var measureControl = L.control.measure({ position: 'topright' });
    measureControl.addTo(map);

    map.on('measurefinish', function (results) {
      let output = JSON.stringify({
        area: results.area,
        areaDisplay: results.areaDisplay,
        lastCoord: results.lastCoord,
        length: results.length,
        lengthDisplay: results.lengthDisplay,
        pointCount: results.pointCount,
        points: results.points
      }, null, 2);

      //self.createMeasurementGeometry(output, self);
    });

//popup binding>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    var lat, long, des, newMarker;
    var notation;
    var i;
     
    const Pin_point = this.missionGeometries;
     var layerGroup = L.layerGroup()
    Pin_point.forEach(Pin_point => {
    let measurementGeometry = JSON.parse(Pin_point.MeasurementGeometry);
      notation = measurementGeometry;
      console.log("printing lat long", notation.lat, notation.lng, notation.desc)
   
        lat = notation.lat
        long = notation.lng
        des = ""
        newMarker = new L.marker([lat, long]).bindPopup(notation.desc)
        newMarker.openPopup()
        layerGroup.addLayer(newMarker);
     
        newMarker.on('click', function(){
            var element = document.getElementById("right_side_bar");
            element.classList.toggle("side-bar-hide");
               
     });
  
});

var overlayMarker = {};

overlayMarker= {'Markers': layerGroup};

console.log("testing layergourp data",layerGroup)
L.control.layers(null, overlayMarker).addTo(map);




    type LayerType = Array<{ id: number, layerName: string }>;

    const arrLayers: LayerType = [      
      { id: 1, layerName: 'Building' },
      { id: 2, layerName: 'Road' },
      { id: 3, layerName: 'Road Devider' },
      { id: 4, layerName: 'Road Centerline' },
      { id: 8, layerName: 'Drain' },
      { id: 5, layerName: 'Bus Stand' },
      { id: 6, layerName: 'Clock Tower' },
      { id: 7, layerName: 'Control Points' },
      
      { id: 9, layerName: 'Electric Poles' },
      { id: 10, layerName: 'Footpath' },
      { id: 11, layerName: 'Light Pole' },        
      { id: 12, layerName: 'Telephone Pole' },
      { id: 13, layerName: 'Temple' },
      { id: 14, layerName: 'Transformer' },
      { id: 15, layerName: 'Underground SewerLine' },
    ];

    var overlayLayers = {};
    
    for (i = 0; i < arrLayers.length; i++) {
      var layerName = arrLayers[i].layerName;
      this.drawingLayerPath = this.s3BucketUrl + '/mission/' + this.gufi + '/layers/' + layerName + '.kml';

      var request = new XMLHttpRequest();      
      try {
        request.open('HEAD', this.drawingLayerPath, false);
        request.send();
      }
      catch (e) {
        console.log(e);
        continue;
      }
      console.log(request.status);
      if (request.status == 200) {
        let layer = omnivore.kml(this.drawingLayerPath, null, null);
        var layerName = arrLayers[i].layerName;
        Object.assign(overlayLayers, { [layerName]: layer }); 
      }
       
    }

   
    L.control.layers(null, overlayLayers).addTo(map);


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Fit to overlay bounds (SW and NE points with (lat, lon))    
    var orthoSettings = JSON.parse(this.uploadItem.DefaultSettings);
    console.log(">>>>>>>>>>>>>>>>>.orthoSettings", orthoSettings)
    if (orthoSettings != null) {
      map.fitBounds([[orthoSettings.maxy, orthoSettings.maxx], [orthoSettings.miny, orthoSettings.minx]]);
    }
    else {
      //Show Message
      //this.notification.ShowInfo('Default setting missing for 2D view.');
    }
    
    map.setZoom(this.defaultZoomLevel);
    this.map = map;
  }

 }
