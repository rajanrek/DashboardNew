import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project.component';
import { ProjectViewComponent } from './project-view.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MissionsComponent } from '../missions/missions.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { MissionviewComponent } from '../missions/missionview.component';
@NgModule({
  imports: [
    CommonModule,
     ProjectsRoutingModule,
     FormsModule, ReactiveFormsModule,
     NgxSpinnerModule,
     NgxPaginationModule
   
  ],
  declarations: [
   ProjectsComponent,
   ProjectViewComponent,
   ProjectComponent,
   MissionsComponent,
   MissionviewComponent
  ]
})
export class ProjectsModule { }
