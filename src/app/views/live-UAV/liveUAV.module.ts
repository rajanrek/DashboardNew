import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { LiveUAVComponent } from './liveUAV.component';
import { LiveUAVRoutingModule } from './liveUAV-routing.module';

@NgModule({
  imports: [
    LiveUAVRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ LiveUAVComponent ]
})
export class LiveUAVModule { }
