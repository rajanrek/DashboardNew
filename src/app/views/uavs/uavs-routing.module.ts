import { UavviewComponent } from './uavview.component';
import { UavComponent } from './uav.component';
import { Routes, RouterModule } from '@angular/router';
import { UavsComponent } from './uavs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: UavsComponent,
    data: {
      title: 'Uavs'
    }
  },
  {
    path: 'uav/:id',
    component: UavComponent,
    data: {
      title: 'Uav'
    }
  },
{
    path: 'uavview/:id',
    component: UavviewComponent,
    data: {
      title: 'UavView'
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
export class UavsRoutingModule { }
