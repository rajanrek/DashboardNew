import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { videosviewComponent } from './videosview.component';
import { videosviewRoutingModule } from './videosview-routing.module';

@NgModule({
  imports: [
    videosviewRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ videosviewComponent ]
})
export class videosviewModule { }
