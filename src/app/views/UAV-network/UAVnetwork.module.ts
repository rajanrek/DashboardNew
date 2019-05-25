import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { UAVnetworkComponent } from './UAVnetwork.component';
import { UAVnetworkRoutingModule } from './UAVnetwork-routing.module';

@NgModule({
  imports: [
    UAVnetworkRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ UAVnetworkComponent ]
})
export class UAVnetworkModule { }
