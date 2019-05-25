import { WaypointsComponent } from './waypoints.component';

import { MissionComponent } from './mission.component';
import { MissionsComponent } from './missions.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionviewComponent } from './missionview.component';

const routes: Routes = [
  {
    path: '',
    component: MissionsComponent,
    data: {
      title: 'missions'
    }
  },
  {
    path: 'mission',
    component: MissionComponent,
    data: {
      title: 'mission'
    }
  },
{
    path: 'missionview/:id',
    component: MissionviewComponent,
    data: {
      title: 'missionview'
    }
  },
  {
    path: 'waypoints',
    component: WaypointsComponent,
    data: {
      title: 'waypoints'
    }
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class MissionsRoutingModule { }
