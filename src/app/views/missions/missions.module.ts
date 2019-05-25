
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MissionsComponent } from './missions.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionComponent } from './mission.component';
import { MissionviewComponent } from './missionview.component';
import { MissionsRoutingModule } from './missions-routing.module';
import { WaypointsComponent } from './waypoints.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    MissionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule
  ],
// tslint:disable-next-line: whitespace
  declarations: [MissionsComponent, MissionComponent, MissionviewComponent, WaypointsComponent]
})
export class MissionsModule { }
