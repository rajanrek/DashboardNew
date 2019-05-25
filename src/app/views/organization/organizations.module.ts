import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations.component';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrgnizationFormComponent } from './orgnization-form.component';
import { OrganizationViewComponent } from './organizationview.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [
    OrganizationsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

 
  ],
  declarations: [ 
    OrganizationsComponent,
    OrgnizationFormComponent, 
    OrganizationViewComponent
  ]
})
export class OrganizationsModule { }
