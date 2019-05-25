import { AnnotationService } from "../../services/annotation.service";
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'workspace-sidebar',
  templateUrl: './workspace-sidebar.component.html',
  styleUrls: ['./workspace-sidebar.component.scss']

})
export class WorkspaceSidebarComponent implements OnInit {
  @Input() currentannotation: any;
  @Input() imagedetails: any;
  @Input() drawnpoints: any;
  @Output() closeAnnotationPanel = new EventEmitter();
  @Output() deleteannotation = new EventEmitter();
  severityOptions: Array<any>;
  status: any;
  comment: Array<any>;
  selectedProductId: any;
  initialValue = 0;
  addPopup: boolean = false;
  showAnnoPopup: boolean = false;
  addingRoot: boolean = false;
  closePanel: boolean = false;
  newannotypeValue: any;
  NewRootAnnotationDetails: any;
  addingChild: boolean = false;
  NewChildAnnotationDetails: any;
  annotation: any;
  parentData: Array<any>;
  childData: Array<any>;
  display: any;
  constructor(public annotationService: AnnotationService) {
    this.severityOptions = [{ Severity: "Low", color: "Red" }, { Severity: "Medium", color: "Red" }, { Severity: "High", color: "Red" }];
  }
  ngOnInit() {
    if (this.currentannotation.Severity) {
      this.currentannotation.Severity = this.currentannotation.Severity
    }
    else {
      this.currentannotation.Severity = 'Low'
    }
    this.getAnnotationType()

  }
  selectAnnotation() {
    this.showAnnoPopup = true;
  }
  close() {
    this.currentannotation.annoName = '';
  }
  saveAnnotation() {
    if (this.currentannotation.AnnotationData && this.currentannotation.AnnotationData != null && this.currentannotation.Severity && this.currentannotation.Severity != null && this.currentannotation.annoName && this.currentannotation.annoName !== null) {
      this.currentannotation.MediaFileId = this.imagedetails.MediaFileId;
      this.currentannotation.MissionId = this.imagedetails.MissionId;
      this.currentannotation.Geometry = JSON.stringify(this.drawnpoints);
      this.currentannotation.Gufi = this.imagedetails.Gufi;
      this.annotationService.saveAnnotation(this.currentannotation).subscribe(result => {
        if (result.IsSuccess) {
          this.closeAnnotationPanel.emit(this.closePanel);
        } else {
          alert('Error! ' + result.ErrorMessage);
        }
      })
    }

    else {
      //this.notification.ShowInfo("All Fields Are Required");
      alert("All Fields Are Required !!")
    }
  }
  closepanel() {
    this.closeAnnotationPanel.emit(this.closePanel);
  }
  DeleteAnnotation() {
    this.deleteannotation.emit();
  }
  getAnnotationType() {
    this.annotationService.getMissionAnnotationsType()
      .subscribe(result => {
        this.annotation = result;
        this.parentData = []
        this.childData = []
        // filtering data making parent child data to render on view
        this.annotation.filter((parentData) => {
          if (parentData.ParentId == null) {
            this.parentData.push(parentData)
          }
        })
        this.parentData.filter((childData, childKey) => {
          this.parentData[childKey].childData = []
          this.annotation.filter((value, index) => {
            if (childData.AnnotationTypeId == value.ParentId) {
              this.parentData[childKey].childData.push(value)
            }
          })
        })
      })

  }
  //initial value is used to add class active to parent li annotation type
  //later we use intial value for getting parent annotation id on adding new child(intial value contain the index of selected parent li)
  changeInitialValue(index) {
    this.initialValue = index;

  }
  selectedAnnotation(selectedAnnoName, selectedAnnoType) {
    this.currentannotation.annoName = selectedAnnoName;
    this.currentannotation.TypeId = selectedAnnoType;
    this.showAnnoPopup = false;
  }
  openaddPopup(addtype) {
    this.addPopup = true;
    // if user want to add parent annotation type we use addingRoot to true
    if (addtype == "root") {
      this.addingRoot = true;
    }
    // if user want to add child annotation type we use addingChild to true
    else if (addtype == "child") {
      this.addingChild = true;
    }
  }
  closeaddPopup() {
    this.addPopup = false;
  }
  onSelectionChange(option) {
    this.currentannotation.Severity = option.Severity
  }
}
