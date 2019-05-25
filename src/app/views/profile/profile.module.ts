import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    ProfileRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ ProfileComponent ]
})
export class ProfileModule { }
