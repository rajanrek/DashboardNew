import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './surveys.component';
import { SurveyRoutingModule } from './surveys-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    SurveyRoutingModule,
    CommonModule,
    NgxSpinnerModule
  ],
  declarations: [SurveyComponent]
})
export class SurveysModule { }
