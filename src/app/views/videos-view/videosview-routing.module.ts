import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { videosviewComponent } from './videosview.component';

const routes: Routes = [
  {
    path: '',
    component: videosviewComponent,
    data: {
      title: 'Videos View'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class videosviewRoutingModule {}
