import { FlightlogsRoutingModule } from './flightlogs-routing.module';
import { FlightlogsComponent } from './flightlogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightlogComponent } from './flightlog.component';
import { FlightlogviewComponent } from './flightlogview.component';

@NgModule({
  imports: [
    CommonModule,
    FlightlogsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],

  declarations: [FlightlogComponent, FlightlogviewComponent, FlightlogsComponent]
})
export class FlightlogsModule { }
