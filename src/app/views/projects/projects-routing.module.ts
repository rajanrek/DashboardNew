import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ProjectViewComponent } from './project-view.component';
import { MissionsComponent } from '../missions/missions.component';
import { MissionviewComponent } from '../missions/missionview.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    data: {
      title: 'Projects'
    }
  },
  {
    path: 'project/:id',
    component: ProjectComponent,
    data: {
      title: 'Project'
    }
  },
  {
    path: 'projectview/:id',
    component: ProjectViewComponent,
    data: {
      title: 'ProjectView'
    }
  },
  {
    path: 'missions/:id',
    component: MissionsComponent,
    data:{
      title: 'Missions'
    }
  },
  {
    path: 'missionview/:id',
    component: MissionviewComponent,
    data: {
      title: 'missionview'
    }
  },
  
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ProjectsRoutingModule { }
