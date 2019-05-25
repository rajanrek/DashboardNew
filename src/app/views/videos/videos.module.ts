import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { videosComponent } from './videos.component';
import { videosRoutingModule } from './videos-routing.module';

@NgModule({
  imports: [
    videosRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ videosComponent ]
})
export class videosModule { }
