import { FlightlogviewComponent } from './flightlogview.component';
import { FlightlogComponent } from './flightlog.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightlogsComponent } from './flightlogs.component';

const routes: Routes = [
  {
    path: '',
    component: FlightlogsComponent,
    data: {
      title: 'flightlogs'
    }
  },
  {
    path: 'flightlog/:id',
    component: FlightlogComponent,
    data: {
      title: 'flightlog'
    }
  },
{
    path: 'flightlogview/:id',
    component: FlightlogviewComponent,
    data: {
      title: 'flightlogview'
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
export class FlightlogsRoutingModule { }
