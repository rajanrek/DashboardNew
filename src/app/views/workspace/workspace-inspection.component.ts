import * as $ from 'jquery';
declare var ol: any;
import { Component, OnInit } from '@angular/core';
//import * as downloader from "file-downloader"
import {
  SurveyListService
} from "../surveys/surveys.services";
import { WorkspaceBase } from "./workspace-base.component";
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MediaService } from "../../services/media.service";
import { AnnotationService } from "../../services/annotation.service";
import { UtilityService } from "../../services/utility.service";
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'workspace-inspection',
  templateUrl: './workspace-inspection.component.html',
  styleUrls: ['./workspace-inspection.component.scss']

})
export class WorkspaceInspectionComponent extends WorkspaceBase implements OnInit {
  isWaiting = false;
  isLoaded = false;
  map: any;
  ol: any;
  flickrSource: any;
  lat: any;
  lng: any;      
  images: any=[];
  isImageUploaded = false;
  public currentImage;
  currentImageIndex: number = 0;
  medialist: any;
  LowSevCount: number = 0;
  MediumSevCount: number = 0;
  HighSevCount: number = 0;
  InfoCount: number = 0;
  psImages: Array<any>;
  videos: Array<any>;
  missionName: any;
  SeverityFilterData: Array<any>=[];
  AnnotationTypeFilterData: Array<any>;
  AssignTagFilterData: Array<any>;
  filteredImages: Array<any>;
  imagesBackup: Array<any>;
  metaData: any;
  mapImages: Array<any>;
  AssignUnassignTag: Array<any>;
  toggleImages: boolean = true;
  toggleVideos: boolean = true;
  tagView: boolean = false;
  showDetails: boolean = true;
  map2: any;
  draw: any;
  userDefinedTags: Array<any>;
  allTags: any;
  annotationGeometry: Array<any>;
  public geometryStyle;
  public geometryStyleWithText;
  mapView: boolean = true;
  imageView: boolean = false;
  sidePanel: boolean = false;
  startDrawing: boolean = false;
  source: any;
  vector: any;
  extent: any;
  projection: any;
  url: any;
  ImageLayer: any;
  view: any;
  select: any;
  selected = 0;
  drawnfeature: any;
  geojsonStr: any;
  DrawnFeature: any;
  drawnPoints: any;
  imageDetails: any;
  deleteAnnotationIfNotSave: boolean = false;
  writer: any;
  currentAnnotation: any;
  pixelFeature: any;
  anotationListing: Array<any>;
  annotationId: any;
  dataToFilterArray: Array<any>;
  tagValue: any;
  constructor(public surveyService: SurveyListService, private activeRoute: ActivatedRoute, public mediaService: MediaService, public annotationService: AnnotationService, public utilityService: UtilityService, private router: Router, private spinner: NgxSpinnerService) {
    super(surveyService);
    this.dataToFilterArray = [];
    this.lng = '-77.549752';
    this.lat = '38.926047';
  }

  ngOnInit() {
    this.spinner.show();
    const queryParams = this.activeRoute.snapshot.queryParams
    const routeParams = this.activeRoute.snapshot.params;
    this.gufi = routeParams.id;
    // do something with the parameters
    super.activate(this.gufi);
      setTimeout(() => {
      this.initMap();
      this.getAnnotationType();
      this.getList(this.currentImageIndex);
      //this.getMission(this.currentImageIndex);
    }, 4000);
     var scope = this
    //removing draw interaction on esc key
    $(document).keyup(function (e) {
      if (e.keyCode == 27) {
        if (scope.map2 && scope.draw) {
          scope.map2.removeInteraction(scope.draw);
        }
      }
    });

  }


  //Initializing Map with image cluster
  initMap() {

    var scope = this;

    if (this.map) {
      this.map.remove();
    }

    let accessToken = environment['mapboxAccessToken']

    this.flickrSource = new ol.source.Vector({
    });
    var clusterSource = new ol.source.Cluster({
      source: this.flickrSource,
      distance: 20
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

      }
    });
    var layer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=' + accessToken
      })
    })
    var center = ol.proj.transform([this.lng, this.lat], 'EPSG:4326', 'EPSG:3857');
    this.map = new ol.Map({
      renderer: 'canvas',
      target: 'map',
      layers: [layer, flickrLayer],
    });
    this.map.setView(new ol.View({
      center: [0, 0],
      zoom: 2
    }));
    //making cursor to pointer on mouse move if the cluster found on mouse move on map1.
    this.map.on('pointermove', function (evt) {
      var pixel = scope.map.getEventPixel(evt.originalEvent);
      var hit = scope.map.hasFeatureAtPixel(pixel);
      document.getElementById(scope.map.getTarget()).style.cursor = hit ? 'pointer' : '';
    });
    //If user click on map and cluster on pixel found then we find the length of feature at that pixel
    // if length is greater than 1 then get zoom level and set by increaing 1 (to extract cluster).
    // if length is equal to 1 then get the mediaid of that feature and load the image on image view.
    this.map.on('click', function (evt) {
      scope.map.forEachFeatureAtPixel(scope.map.getEventPixel(evt.originalEvent), function (feature, layer) {
        if (feature.get('features').length > 1) {
          var zoom = scope.map.getView().getZoom()
          scope.map.getView().setZoom(zoom + 1);
        }
        else {
          var index
          var item
          scope.images.find(function (element, key) {
            //finding the index from the images array of the matching feature MediaFileId
            if (element.MediaFileId == feature.get('features')[0].get('MediaFileId')) {
              index = key
              item = element
            }
          });
          //to load images in image view.
          scope.onImageThumbnailClick(index, item)
        }
      })
    });
  }
  // get list function to find all the images and videos related to mission.
  getList(currIndex) {
    this.spinner.show();
    this.mediaService.getMediaList(this.gufi)
      .subscribe(results => {
        // Images
        if (results != null && results.MediaFileGroup[0] != null && results.MediaFileGroup[0].MediaFileItemList != null) {
          this.images = [];
          this.SeverityFilterData = []
          this.AnnotationTypeFilterData = [];
          this.AssignTagFilterData = [];
          this.isImageUploaded = false;
          this.currentImage = null;
          this.currentImageIndex = currIndex;
          this.medialist = results.MediaFileGroup[0];
          this.LowSevCount = 0
          this.MediumSevCount = 0
          this.HighSevCount = 0
          this.InfoCount = 0
          this.flickrSource.clear();
          this.psImages = [];
          this.videos = [];
          if (this.medialist) {
            this.missionName = this.medialist.MissionName;
            this.medialist.MediaFileItemList.filter(x => x.TypeName == 'Picture').map(x => {
              // making array of all Severity related to mission !!!!! 

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
                this.SeverityFilterData.push(severityData.Severity);

              })
              x.LowSevCount = this.LowSevCount
              x.MediumSevCount = this.MediumSevCount
              x.HighSevCount = this.HighSevCount
              // adding annotation type name to annotation details by using the typeid from annotation details
              this.anotationListing.map((annotationTypedata) => {
                x.Annotations.map((annotation) => {

                  if (annotationTypedata.AnnotationTypeId == annotation.TypeId) {
                    annotation.annoTypeName = annotationTypedata.Name
                  }

                })
              })
              //making array of all annotation type related to mission !!!!!  
              x.Annotations.map((annotationName) => {
                if (annotationName.annoTypeName) {
                  this.AnnotationTypeFilterData.push(annotationName.annoTypeName);
                }

              })
               //Making an array of all the assign tag to this mission and pushing it in AssignTagFilterData
               //Also after loop ends removing duplicates using Utility.removeDuplicates(this.AssignTagFilterData) to render data on filter box.
              x.AnnotationTags.map((annotationName) => {
                this.AssignTagFilterData.push(annotationName.Tag);
              })
               //Filter annotation array to and creating new filter annotation array to have single severity on image
              x.FilterseverityTypeForImage = x.Annotations.filter((thing, index, self) =>
                index === self.findIndex((t) => (
                  t.Severity === thing.Severity
                ))
              )
              x.Annotations.map(sev => {
                if (sev.Severity == 'Low') {
                  sev.color = 'rgb(193	39	45)'
                }
                else if (sev.Severity == 'Medium') {
                  sev.color = 'rgba(204,204,0,1.00)'
                }
                else if (sev.Severity == 'High') {
                  sev.color = 'rgba(193, 39, 45, 1.00)'
                }
              })
              this.images.push(x);
              this.imagesBackup = this.images
              x.name = this.utilityService.getFileName(x.FileLocation);
              let metaData = JSON.parse(x.MetaData);
              if (metaData.Latitude && metaData.Longitude) {

                let pic = {
                  //i: this.mapImages.length,
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
                  this.map.setView(new ol.View({
                    center: coordinate,
                    zoom: 16
                  }));
                }

              }
              else {
                this.map.setView(new ol.View({
                  center: [0, 0],
                  zoom: 2
                }));
              }
            });
            this.medialist.totalLowCount = this.LowSevCount;
            this.medialist.totalMediumCount = this.MediumSevCount;
            this.medialist.totalHighCount = this.HighSevCount;
            this.medialist.totalInfoCount = this.InfoCount;
            this.medialist.MediaFileItemList.filter(x => x.TypeName == 'Video').map(x => {
              this.videos.push(x);

              this.psImages.push({
                html: '<div class="videoSlide">' +
                  '<div class="videoSlideInner">' +
                  '<video width="70%" id="videoPlayer' +
                  x.MediaFileId +
                  '" controls controlsList="nodownload" poster="data:image/gif,AAAA"><source src="' +
                  x.FileLocation +
                  '" type="video/mp4" />' +
                  '</video>' +
                  '</div>' +
                  '<div class="playpause" id="bigPlay"></div>' +
                  '</div>',
                pid: 'img' + x.MediaFileId
              });
            });
            this.isImageUploaded = this.medialist.MediaFileItemList.length > 0;
            //Set First Image as Current Image
            this.currentImage = this.images[this.currentImageIndex];

            //Set MetaData Of Current Image
            this.metaData = JSON.parse(this.currentImage.MetaData);
            // Removing duplicates value from array to show unique data on filter popup.(these arrays are created only to render unique data on Ui ie. filter popup)
            this.SeverityFilterData = this.utilityService.removeDuplicates(this.SeverityFilterData);
            this.AssignTagFilterData = this.utilityService.removeDuplicates(this.AssignTagFilterData);
            this.AnnotationTypeFilterData = this.utilityService.removeDuplicates(this.AnnotationTypeFilterData);
          }
        }
        else {
          this.map.setView(new ol.View({
            center: [0, 0],
            zoom: 2
          }));
        }
      }, error => {
        console.log(">>>>>>>>>>>>>>>error is", error);
      }, () => {
        this.isWaiting = false;
        this.isLoaded = true;
        this.spinner.hide();
      })
   
  }

  //creating map and loding image layer if map exists remove previous layer and add new layer
  onImageThumbnailClick(index, item) {
    this.AssignUnassignTag = [];
    if (this.map2 && this.draw) {
      this.map2.removeInteraction(this.draw);
    }
    if (this.tagView) {
      this.tagView = false;
    }

    this.showDetails = true;
    //$('div.imgMargin img').removeClass('activethumbnail');
    this.setCurrentImage(index);
  }

  initMap2(item) {
    var updateMap1 = setInterval(() => {
      this.map2.updateSize()
      clearInterval(updateMap1);
    }, 1)
    var scope = this;
    var image = new ol.style.Circle({
      radius: 5,
      fill: null,
      stroke: new ol.style.Stroke({ color: 'red', width: 1 })
    });
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
          font: '16px Calibri,sans-serif',
          fill: new ol.style.Fill({ color: feature.color }),
          overflow: true,
        })
      }),
      ];
    };
    this.geometryStyleWithText = function (feature, resolution) {
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
          font: '16px Calibri,sans-serif',
          fill: new ol.style.Fill({ color: feature.color }),
          overflow: true,
          placement: "point",
          textBaseline: "top",
          text: feature.comment
        })
      }),
      ];
    };
    this.mapView = false;
    this.imageView = true;
    this.sidePanel = false;
    this.showDetails = true;
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
    this.url = item.FileLocation;
    //creating static image layer by giving dynamic url.

    var imageSource = new ol.source.ImageStatic({
      url: this.url,
      projection: this.projection,
      imageExtent: this.extent,
      wrapX: false
    })
    var self = this;
    imageSource.on('imageloadstart', function () {
      self.spinner.show();
    })
    imageSource.on('imageloadend', function () {
      self.spinner.hide();
    });
    this.ImageLayer = new ol.layer.Image({
      source: imageSource
    })
    this.view = new ol.View({
      projection: this.projection,
      center: ol.extent.getCenter(this.extent),
      resolution: 1,        // important for 100% image size!
      maxResolution: 1
    })
    if (this.map2) {
      this.map2.removeLayer(this.ImageLayer);
      this.map2.addLayer(this.ImageLayer);
      this.map2.removeLayer(this.vector);
      this.map2.addLayer(this.vector);
      this.map2.removeInteraction(this.select);

    } else {
      this.map2 = new ol.Map({
        layers: [this.ImageLayer, this.vector],
        target: 'map2',
        view: this.view
      });
    }

    this.map2.on('pointermove', function (e) {
      if (!scope.startDrawing) {
        if (e.dragging) return;
        var pixel = e.map.getEventPixel(e.originalEvent);
        var hit = e.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
          scope.pixelFeature = feature
          return feature.getGeometry().getType() === 'Polygon';
        });
        e.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        //to change style to show text on drawn geometry on hover
        if (e.map.getTargetElement().style.cursor == "pointer") {
          scope.pixelFeature.setStyle(scope.geometryStyleWithText)
        }
        else {
          if (scope.pixelFeature) {
            scope.pixelFeature.setStyle(scope.geometryStyle)
          }
        }
      }
    })
    this.select = new ol.interaction.Select({
      layers: [this.vector],
      style: function (feature, resolution) {
        feature.setStyle(scope.geometryStyle);
      }
    });
     //adding select interaction on map to select annotation.
    this.map2.addInteraction(this.select);
    this.select.on('select', (e) => {
      this.imageDetails = this.currentImage
      if (e.selected.length > 0) {
        var extent = e.selected[0].getGeometry();
        this.map2.getView().fit(extent, this.map2.getSize());
        this.writer = new ol.format.GeoJSON();
        //getting faeture and conveting to geojson to send geometry data..
        this.geojsonStr = this.writer.writeFeatures([e.selected[0]]);
        this.DrawnFeature = JSON.parse(this.geojsonStr);
        this.drawnPoints = this.DrawnFeature.features[0];
        this.annotationId = e.selected[0].id
        if (this.annotationId) {
          this.map2.removeInteraction(this.draw);
          this.getAnnotationById(this.annotationId);
        }
      }
    });
  }

  addInteraction() {
    //var draw;
    var value = 'Square';
    if (value !== 'None') {
      var geometryFunction;
      if (value === 'Square') {
        value = 'Circle';
        geometryFunction = ol.interaction.Draw.createBox();
      }
      this.draw = new ol.interaction.Draw({
        source: this.source,
        type: value,
        geometryFunction: geometryFunction
      });
      var self = this;
      this.draw.on('drawend', function (e) {
    
        //zoom to geometry extent on draw created
        var extent = e.feature.getGeometry();
        self.map2.getView().fit(extent, self.map2.getSize());
        //... unset sketch
        //save currently drawn feature to drawnfeature so that we can easily remove it if user close annotation before saving.
        self.drawnfeature = e.feature;
        self.writer = new ol.format.GeoJSON();
        self.geojsonStr = self.writer.writeFeatures([e.feature]);
        self.DrawnFeature = JSON.parse(self.geojsonStr);
        self.drawnPoints = self.DrawnFeature.features[0];
        self.imageDetails = self.currentImage;
        self.deleteAnnotationIfNotSave = true;
        self.NewAnnotation();

        //this.geojsonObject.features.push(this.DrawnFeature.features[0]);
        self.map2.removeInteraction(self.draw);
      }, this);
      this.map2.addInteraction(this.draw);
    }
  }
  createAnnotation() {
    this.startDrawing = true;
    this.tagView = false;
    this.addInteraction();
  }
  
  getAnnotations(mediaFileId) {
    this.annotationGeometry = []
    //this.severityDataAndColor = []
    this.isWaiting = true;
    var format = new ol.format.GeoJSON()
    this.annotationService.get2DAnnotations(mediaFileId)
      .subscribe(result => {
        for (var i = 0; i < result.Annotations.length; i++) {
          var fea = format.readFeature(result.Annotations[i].Geometry);
          this.annotationGeometry.push(fea);
          this.annotationGeometry[i].comment = result.Annotations[i].AnnotationData
          this.annotationGeometry[i].id = result.Annotations[i].AnnotationId
          if (result.Annotations[i].Severity == "Low") {
            this.annotationGeometry[i].color = "rgb(255, 255, 255)"
          }
          else if (result.Annotations[i].Severity == "Medium") {
            this.annotationGeometry[i].color = "rgba(204,204,0,1.00)"
          }
          else if (result.Annotations[i].Severity == "High") {
            this.annotationGeometry[i].color = "rgba(193, 39, 45, 1.00)"
          } 
        }
        //this.geojsonObject = {}
        this.initMap2(this.currentImage)
        this.isWaiting = false;
      });
  }
  gotoPreviousSlide() {
    this.selected = this.currentImageIndex - 1
    this.setCurrentImage(this.currentImageIndex - 1);
  }
  gotoNextSlide() {
    this.selected = this.currentImageIndex + 1
    this.setCurrentImage(this.currentImageIndex + 1);
  }
  setCurrentImage(n) {
    this.selected = n; 
    this.currentImage = this.images[n];
    this.metaData = JSON.parse(this.currentImage.MetaData);
    this.currentImageIndex = n;

    //Highlight Selected Thumbnail
    //Remove Previous Active Selected Thumbnail Class
    //$('div.imgMargin img').removeClass('activethumbnail');

    //Add Active Class For Selected Thumbnail
    //$('#img' + this.currentImage.MediaFileId.toString()).addClass('activethumbnail');
    this.getTags(this.currentImage.MediaFileId);
    this.getAnnotations(this.currentImage.MediaFileId);

  }
  assignTag() {
    if (this.AssignUnassignTag.length > 0) {
      var saveTag = true
      this.allTags.map(assignedTag => {
        if (saveTag) {
          this.AssignUnassignTag.map(tagtoAssign => {
            if (assignedTag.MediaFileId == this.currentImage.MediaFileId && assignedTag.Tag == tagtoAssign) {
              alert("assignedTag.Tag + ' ' + 'Already Assigned Add and select new tag to Assign!'");
              saveTag = false
            }
          })
        }
      })
      //if there is no such tag in database against mediafileid than only save to database
      if (saveTag) {
        this.annotationService.assignTag(this.currentImage.MediaFileId, this.AssignUnassignTag).subscribe(result => {
          if (result.IsSuccess) {
            $(':input').val('');
            alert("Tag Assigned Succesfully");
            this.getList(this.currentImageIndex);
            this.getTags(this.currentImage.MediaFileId);
            this.AssignUnassignTag = []
            //to change the opacity of userdefined tags
            $('.selectedAnnotationStyle').css('opacity', '0.5');
          }
          else {
          }
        })
      }
    }
    else {
      alert("Add tag and select to assign it!");
    }
  }
  UnassignTag() {
    if (this.AssignUnassignTag.length > 0) {
      this.annotationService.UnassignTag(this.currentImage.MediaFileId, this.AssignUnassignTag).subscribe(result => {
        if (result.IsSuccess) {
          $(':input').val('');
          alert('Tag Unssigned Successfully!');
          this.getList(this.currentImageIndex);
          this.getTags(this.currentImage.MediaFileId);
          this.AssignUnassignTag = []
          $('.selectedAnnotationStyle').css('opacity', '0.5');
        }
        else {
        }
      })
    }
  }

  addUserTag() {
    //userDefinedTags is only used to show assiged tag based on mediafile id on UI
    if (this.tagValue) {
      this.userDefinedTags.push({ "Tag": this.tagValue,   "MediaFileId": this.currentImage.MediaFileId })
      $(':input').val('');
      this.tagValue = ''
      //Restricting user to create duplicate tags.
      //this.userDefinedTags = Utility.removeDuplicates(this.userDefinedTags);
      this.userDefinedTags = this.utilityService.removeDuplicates(this.userDefinedTags, "Tag");
    }
  }
  // function to change opacity on sellect of tag to assign
  changeStyle(index, tag) {
    if ($('#' + index).css('opacity') == '0.5') {
      console.log(">>>>>>>>>>>>>>>>i am called");
      $('#' + index).css('opacity', '1.0')
      //making array of tag to assign or unassign
      this.AssignUnassignTag.push(tag)

    }
    else {
      $('#' + index).css('opacity', '0.5')
      //this.AssignUnassignTag.push(tag)
      //if user click again on tag remove that tag from AssignUnassignTag so that correct count of selected tag render
      this.AssignUnassignTag = this.AssignUnassignTag.filter(savedtag => {
        if (!(savedtag == tag)) {
          return tag
        }
      })
    }
    //AssignUnassignTag is an array of tag which user want to assign
    this.AssignUnassignTag = this.utilityService.removeDuplicates(this.AssignUnassignTag);
  }
  downloadImage(item): void {
    this.spinner.show();
    let fileName = this.currentImage.name;
    let filePath = this.currentImage.FileLocation;
    this.utilityService.getFile(`${filePath}?x=${new Date().getTime()}`)
      .subscribe(fileData => {
        this.spinner.hide();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(fileData);
        a.download = fileName;
        document.body.appendChild(a);
        a.click()
      }
      );
  }

  //method to make data array to search
  searchbyTag(filtername) {
    this.dataToFilterArray.push(filtername)
    this.dataToFilterArray = this.utilityService.removeDuplicates(this.dataToFilterArray);
    this.filterImages()
  }
   // method to search images based on data in dataToFilterArray
  filterImages() {
    this.filteredImages = []
    // filtering the images based on annotation type and severity.
    this.imagesBackup.filter(annoarry => {
      annoarry.Annotations.filter(annodata => {
        for (var i = 0; i <= this.dataToFilterArray.length; i++) {
          if (annodata.Severity == this.dataToFilterArray[i] || annodata.annoTypeName == this.dataToFilterArray[i]) {
            this.filteredImages.push(annoarry)
          }
          this.filteredImages = this.utilityService.removeDuplicates(this.filteredImages, "MediaFileId");
        }
      })
      // filtering the images based on tag.
      annoarry.AnnotationTags.filter(annotag => {
        for (var i = 0; i <= this.dataToFilterArray.length; i++) {
          if (annotag.Tag == this.dataToFilterArray[i]) {
            this.filteredImages.push(annoarry)
          }
          this.filteredImages = this.utilityService.removeDuplicates(this.filteredImages, "MediaFileId");
        }
      })
    })
    // if there is no data in  dataToFilterArray show all the images of mission
    if (this.filteredImages.length == 0) {
      this.filteredImages = this.imagesBackup
    }
    // rendering images based on result of filteredImages
    this.images = this.filteredImages    
  }
   // method to remove the selected filter and then serach data based on remaining data in  dataToFilterArray
  removeSelectedFilterTag(data) {
    this.dataToFilterArray = this.dataToFilterArray.filter((tagName, key) => {
      if (!(tagName == data)) {
        return tagName
      }
    })
    this.filterImages()
  }
  getAnnotationType() {
    this.annotationService.getMissionAnnotationsType()
      .subscribe(result => {
        this.anotationListing = result
      })
  }
  cancelAnnotation() {
    //go to default extent on draw saved
    var view = this.map2.getView();
    var res = view.minResolution_
    this.map2.getView().fit(this.extent, this.map2.getSize());
    view.setResolution(1);
    this.select.getFeatures().clear();
    //this.map2.getView().setCenter(ol.extent.getCenter(this.extent))
    if (this.deleteAnnotationIfNotSave && this.drawnfeature && Object.getOwnPropertyNames(this.drawnfeature).length !== 0) {
      this.vector.getSource().removeFeature(this.drawnfeature);
      this.drawnfeature = {}
    }
  }
  getAnnotationById(id) {
    this.annotationService.getAnnotation(id)
      .subscribe(result => {
        if (result) {
          console.log(">>>>>>>>>>>>>>>.result is", result);
          this.anotationListing.map(annotype => {
            if (annotype.AnnotationTypeId == result.TypeId) {
              result.annoName = annotype.Name
            }
          })

          this.currentAnnotation = result;
          this.showDetails = false;
          this.sidePanel = true;
        }
      })

  }
  NewAnnotation() {
    this.annotationService.getNewAnnotation()
      .subscribe(result => {
        if (result.TypeId == 0) {
          result.annoName = null;
        }
        this.currentAnnotation = result;
        this.showDetails = false;
        this.sidePanel = true;
        //this.isEditing = true;
      });
  }
  toggle(panel) {
    switch (panel) {
      case 'images':
        this.toggleImages = !this.toggleImages;
        break;
      case 'videos':
        this.toggleVideos = !this.toggleVideos;
        break;
    }
  }

  toggleDetails() {
    if (this.draw) {
      this.map2.removeInteraction(this.draw);
      this.startDrawing = false;
    }
    this.showDetails = !this.showDetails
    if (this.showDetails) {
      this.tagView = false
    }
  }
  deleteItem() {
    if (this.draw) {
      this.map2.removeInteraction(this.draw);
      this.startDrawing = false;
    }

    var id = this.currentImage.MediaFileId
    this.mediaService.deleteMedia(id)
      .subscribe(result => {
        this.images.splice(this.currentImageIndex, 1);
        if (this.currentImageIndex !== 0) {
          this.currentImageIndex--;
        }
        if (this.images.length > 0) {
          this.setCurrentImage(this.currentImageIndex);
        } else {
          this.images = [];
        }
      });
  }
  toggleTagView() {
    if (this.draw) {
      this.map2.removeInteraction(this.draw);
      this.startDrawing = false;
    }
    this.tagView = !this.tagView
    if (this.tagView) {
      this.showDetails = false
    }
  }

  //function to get all the tag
  getTags(MediaFileId) {
    this.annotationService.getTags()
      .subscribe(result => {
        this.userDefinedTags = []
        //filter assign  tag based on mediafileid to show on ui
        result.map((tag) => {
          if (tag.MediaFileId == MediaFileId) {
            this.userDefinedTags.push(tag)
          }
        })
        this.allTags = result;
      })
  }
  showHideMiniMap() {
    if ($('#map').hasClass('mini-ol3-view') && !($('#map').hasClass('mapDisplay'))) {
      $('#map').addClass('mapDisplay');
    }
    else {
      $("#map").removeClass('mapDisplay');
    }
  }
  changeView() {
    if ($('#map').hasClass('mapDisplay')) {
      $("#map").removeClass('mapDisplay');
    }
    this.imageView = !this.imageView;
    this.mapView = !this.mapView;
    var updateMap1 = setInterval(() => {
      this.map.updateSize()
      this.map2.updateSize()
      clearInterval(updateMap1);

    }, 1)
  }
  recieveChildData(event) {
    this.sidePanel = event
    this.showDetails = true;
    this.getList(this.currentImageIndex);
    this.deleteAnnotationIfNotSave = false;
    this.cancelAnnotation();
    this.getAnnotations(this.currentImage.MediaFileId);
    this.startDrawing = false;
  }
  deleteAnnotationCall() {
    this.annotationService.deleteAnnotation(this.annotationId)
        .subscribe(result => {
          this.getList(this.currentImageIndex);
          this.cancelAnnotation();
          this.getAnnotations(this.currentImage.MediaFileId);
        })
  }
  debugger;
  generateReport() {
    this.router.navigate(['/workspace/inspection-report/' + this.gufi])
  }
}
