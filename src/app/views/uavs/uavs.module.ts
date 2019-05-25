import { UavsComponent } from './uavs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UavComponent } from './uav.component';
import { UavviewComponent } from './uavview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UavsRoutingModule } from './uavs-routing.module';


@NgModule({
  imports: [
    CommonModule,
    UavsRoutingModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  declarations: [UavComponent, UavviewComponent, UavsComponent]
})
export class UavsModule { }
