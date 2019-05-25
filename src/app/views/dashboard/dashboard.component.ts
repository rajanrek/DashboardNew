import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DashboardService } from './dashboard.service';
import { environment } from '../../../environments/environment';
import * as L from "leaflet";
@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  zoomLevel = 10;
  isWaiting = false;
  lat = "28.6139";
  lng = "77.2090";
  map: any;
  public projects;
  public dashboardData;
  drawnItems: any;
  geoJsonData: any;
  selectedProjectId: any = null;
  radioModel: string = 'Month';
  public projCount: any = 0;
  public totalFlights: any = 0;
  public totalLocations: any = 0;
  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: getStyle('--info'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';


  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];
  public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend = false;
  public lineChart3Type = 'line';


  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A'
    }
  ];
  public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 0.6,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';

  // mainChart

  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';

  // social box charts

  public brandBoxChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public brandBoxChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public brandBoxChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public brandBoxChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public brandBoxChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public brandBoxChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public brandBoxChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public brandBoxChartLegend = false;
  public brandBoxChartType = 'line';

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  constructor(private dashboardService: DashboardService, private router: Router) {

  }
  ngOnInit(): void {
     this.init()
    // generate random values for mainChart
    for (let i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(this.random(50, 200));
      this.mainChartData2.push(this.random(80, 100));
      this.mainChartData3.push(65);
    }
  }
  init() {
    let actions = [];    
    actions.push(this.initMap());
    actions.push(this.dashboardService.getProjects());
    actions.push(this.dashboardService.getDashboardData());
    Promise.all(actions)
      .then(results => {
        //this.spinner.hide()
        this.projects = results[1];
        this.dashboardData = results[2];
        console.log('Projects:', this.projects);
        this.projects.subscribe((data) => {
          this.drawProjects(data);
          this.projCount = data.length;
        })
        this.dashboardData.subscribe((dashdata) => {
          console.log(">>>>>>>>>>>>.recent surveys are", dashdata);
          this.totalFlights = dashdata.TotalFlights;
          this.totalLocations = dashdata.TotalLocations;
        })
      })
      .catch(e => {
        console.error(e);
      })
  }
  initMap() {
    let accessToken = environment['mapboxAccessToken']
    //L.Icon.Default.imagePath = '/images';

    var streetMap = L.tileLayer(
      "https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=" +
      accessToken,
      {
        attribution: '<a href="https://www.mapbox.com/map-feedback/">Mapbox</a>'
      }
    );

    var satelliteMap = L.tileLayer(
      "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=" +
      accessToken,
      {
        attribution: '<a href="https://www.mapbox.com/map-feedback/">Mapbox</a>'
      }
    );

    //Section Map Layer
    var sectionalMap = L.tileLayer(
      "https://wms.chartbundle.com/tms/v1.0/sec/{z}/{x}/{y}.png?type=google", {
        attribution: '� <a href="https://www.chartbundle.com/">Chartbundle</a>'
      });

    let baseMaps = {
      "Satellites": satelliteMap,
      "Streets": streetMap,
      "VFR Sectional": sectionalMap
    };

    let map = L.map("map", {
      zoomControl: false,
      drawControl: false,
      editable: false,
      maxNativeZoom: 22,
      layers: [streetMap]
    })
      .setView([this.lat, this.lng], this.zoomLevel);

    L.control
      .zoom({
        maxZoom: 22,
        position: "topright"
      })
      .addTo(map);

    map.doubleClickZoom.disable();
    this.map = map;
  }
  drawProjects(items) {
    if (items.length > 0) {
      //Create FeatureCollection Object
      if (this.drawnItems) {
        this.drawnItems.eachLayer(layer => this.map.removeLayer(layer));
      }
      this.drawnItems = new L.FeatureGroup().addTo(this.map);
      let scope = this;
      var projectLocations = [];
      items.map(x => {
        let projectName = x.Name;
        let projectId = x.ProjectId;
        if (x.ProjectLocation != null) {
          let projectLocation = JSON.parse(x.ProjectLocation);
          let latlng = new L.latLng(projectLocation.coordinates[0], projectLocation.coordinates[1]);
          let marker = new L.Marker(latlng, { color: "rgb(255,0,0)" })
            .on('click', function (e) {
              //open popup;                                                    
              scope.router.navigate(['/surveys', projectId])
            })
            .on('mouseover', function (e) {
              //open popup;
              e.target.bindPopup('Project - ' + projectName).openPopup();
            })
            .on('mouseout', function (e) {
              //close popup;
              e.target.closePopup();
            });
                    
          projectLocations.push(marker);
          scope.drawnItems.addLayer(marker);
        }
        else {
          //this.notification.ShowInfo("Mission - " + projectName + " : Project Geography Not Found.");                  
        }
      });

      //Draw all Markers
      projectLocations.map(x => {
        x.addTo(scope.map);
      });
      this.adjustView(projectLocations);
    }
    else {
      //this.notification.ShowInfo("No Project Found.");
      console.log(">>>>>>>>>>>>>>>>>>.no project found");
      
    }
  }
  adjustView(locations) {
    if (locations.length > 0) {
      let group = new L.featureGroup(locations);
      this.map.fitBounds(group.getBounds(), { padding: [30, 30], maxZoom: 16 });
    }
  }
}
