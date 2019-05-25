import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { UAVnetworkviewComponent } from './UAVnetworkview.component';
import { UAVnetworkviewRoutingModule } from './UAVnetworkview-routing.module';

@NgModule({
  imports: [
    UAVnetworkviewRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ UAVnetworkviewComponent ]
})
export class UAVnetworkviewModule { }
