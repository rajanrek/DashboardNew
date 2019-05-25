import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UAVnetworkComponent } from './UAVnetwork.component';

const routes: Routes = [
  {
    path: '',
    component: UAVnetworkComponent,
    data: {
      title: 'UAV Network'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UAVnetworkRoutingModule {}
