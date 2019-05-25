import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RsurveyComponent } from './rsurvey.component';

const routes: Routes = [
  {
    path: '',
    component: RsurveyComponent,
    data: {
      title: 'Recent Survey'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RsurveyRoutingModule {}
