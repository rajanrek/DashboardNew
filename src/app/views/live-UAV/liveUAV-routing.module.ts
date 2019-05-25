import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveUAVComponent } from './liveUAV.component';

const routes: Routes = [
  {
    path: '',
    component: LiveUAVComponent,
    data: {
      title: 'LiveUAV'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveUAVRoutingModule {}
