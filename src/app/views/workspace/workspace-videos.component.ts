import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from "../../services/media.service";
import { Router } from '@angular/router';
import { WorkspaceComponent } from './workspace.component'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'workspace-videos',
  templateUrl: './workspace-videos.component.html',

})
export class WorkspaceVideosComponent implements OnInit {
  gufi: any;
  videos: Array<any>;
  medialist: any;
  isImageUploaded: any;
  constructor(private activeRoute: ActivatedRoute, public mediaService: MediaService, private router: Router, private spinner: NgxSpinnerService, public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.spinner.show();
    const queryParams = this.activeRoute.snapshot.queryParams
    const routeParams = this.activeRoute.snapshot.params;
    this.gufi = routeParams.id;
    this.getVideos();
  }
  checkUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  // get list function to find all the images and videos related to mission.
  getVideos() {
    this.spinner.show();
    this.mediaService.getMediaList(this.gufi)
      .subscribe(results => {
        console.log(">>>>>>>>>>>>>>video result",results)
        // Images
        if (results != null && results.MediaFileGroup[0] != null && results.MediaFileGroup[0].MediaFileItemList != null) {
          this.videos = [];
          this.medialist = results.MediaFileGroup[0];
          if (this.medialist) {
            this.medialist.MediaFileItemList.filter(x => x.TypeName == 'Video').map(x => {
              this.videos.push(x);
              console.log(">>>>>>>>>>>>>>videos", this.videos);
            });
          }
        }
        else {
        }
      }, error => {
        console.log(">>>>>>>>>>>>>>>error is", error);
      }, () => {
        this.spinner.hide();
      })
   
  }

}
