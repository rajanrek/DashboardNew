import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { videosComponent } from './videos.component';

const routes: Routes = [
  {
    path: '',
    component: videosComponent,
    data: {
      title: 'Videos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class videosRoutingModule {}
