import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router'; 
import {
  SurveyListService
} from './surveys.services';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'survey-list',
  templateUrl: './surveys.component.html',
  //styleUrls: ['./surveys.component.scss']
})
export class SurveyComponent implements OnInit {
  surveysList: any;
  constructor(private router: Router, private surveyService: SurveyListService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
      this.route.params
        .map(params => params['id'])
        .subscribe((id) => {
          this.getSurveysById(id)
        });
  }
  sketchView(survey) {
    this.router.navigate(['/workspace/sketch', survey.Gufi])
  }
  otho(survey) {
    this.router.navigate(['/workspace/2d', survey.Gufi])
  }
  Inspection(survey) {
    this.router.navigate(['/workspace/inspection', survey.Gufi])
  }
  getSurveysById(id) {
    this.surveyService.getSurveysById(id).subscribe((res) => {
      this.spinner.hide();
      this.surveysList = res.Flights;
      //sort by latest surveys.
      this.surveysList.sort(function (a, b) {
        {
          return new Date(b.DateCreated).getTime() - new
            Date(a.DateCreated).getTime()
        }
      })
      console.log(">>>>>>>>>>>>>>>>.survys list", this.surveysList);
    }, (err) => {
      console.log(err);
    });
  }
}
