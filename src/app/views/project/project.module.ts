// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProjectComponent } from './project.component';



// Components Routing
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProjectRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [
    ProjectComponent,
  ]
})
export class ProjectModule { }
