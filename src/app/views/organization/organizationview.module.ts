import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { OrganizationViewRoutingModule } from './organizationview-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import {BrowserModule} from '@angular/platform-browser';
@NgModule({
  imports: [
    OrganizationViewRoutingModule,
    ChartsModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
     ],
  declarations: [  ]
})
export class OrganizationViewModule { }
