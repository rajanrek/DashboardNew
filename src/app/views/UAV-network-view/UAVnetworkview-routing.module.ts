import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UAVnetworkviewComponent } from './UAVnetworkview.component';

const routes: Routes = [
  {
    path: '',
    component: UAVnetworkviewComponent,
    data: {
      title: 'UAV Network view'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UAVnetworkviewRoutingModule {}
