import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyComponent } from './surveys.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyComponent,
    data: {
      title: 'surveys'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
