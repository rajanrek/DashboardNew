import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { RsurveyComponent } from './rsurvey.component';
import { RsurveyRoutingModule } from './rsurvey-routing.module';

@NgModule({
  imports: [
    RsurveyRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ RsurveyComponent ]
})
export class RsurveyModule { }
