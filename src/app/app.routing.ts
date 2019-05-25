import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  
  {
    path: '',
    //component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        component: DefaultLayoutComponent,
        path: 'project',
        loadChildren: './views/project/project.module#ProjectModule'
      },
      {
        //component: DefaultLayoutComponent,
        path: 'workspace',
        loadChildren: './views/workspace/workspace.module#WorkspaceModule'
      },
      {
        component: DefaultLayoutComponent,
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        // component: DefaultLayoutComponent,
        path: 'liveUAV',
        loadChildren: './views/live-UAV/liveUAV.module#LiveUAVModule'
      },
      {
        component: DefaultLayoutComponent,
        path: 'surveys/:id',
        loadChildren: './views/surveys/surveys.module#SurveysModule'
      },
       {
        component: DefaultLayoutComponent,
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule'
      },
        
       {
         component: DefaultLayoutComponent,
         path: 'organizations',
         loadChildren: './views/organization/organizations.module#OrganizationsModule'
       },
       {
         component: DefaultLayoutComponent,
         path: 'projectList',
         loadChildren: './views/projects/projects.module#ProjectsModule'
       },
       {
        component: DefaultLayoutComponent,
        path: 'users',
        loadChildren: './views/users/users.module#UsersModule'
       },
       {
         component: DefaultLayoutComponent,
         path: 'missions',
         loadChildren:'./views/missions/missions.module#MissionsModule'
       },
       {
         component: DefaultLayoutComponent,
         path: 'flightlogs',
         loadChildren: './views/flightlogs/flightlogs.module#FlightlogsModule'
       },
       {
         component: DefaultLayoutComponent,
         path:'uavs',
         loadChildren: './views/uavs/uavs.module#UavsModule'
       },
       {
        component: DefaultLayoutComponent,
        path: 'rsurvey',
        loadChildren: './views/recent-survey/rsurvey.module#RsurveyModule'
      }, 
       {
        component: DefaultLayoutComponent,
        path: 'videos',
        loadChildren: './views/videos/videos.module#videosModule'
      },
       {
        component: DefaultLayoutComponent,
        path: 'videosview',
        loadChildren: './views/videos-view/videosview.module#videosviewModule'
      },
	   {
        path: 'UAVnetwork',
        loadChildren: './views/UAV-network/UAVnetwork.module#UAVnetworkModule'
      },
      {
        path: 'UAVnetworkview',
        loadChildren: './views/UAV-network-view/UAVnetworkview.module#UAVnetworkviewModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
